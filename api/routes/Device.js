import express from 'express';
import { body, query ,param,  validationResult } from 'express-validator';

import base64Img from 'base64-img'
import fs from 'fs';
import path from 'path';
import Device from '../controllers/Device.js';
import Auth_admin from '../middleware/Auth_admin.js';

const router = express.Router();

const uploadDir = path.resolve('./public/uploads')
let rs_file;

router.get('/',  Auth_admin,[
    query('page').isInt().not().isEmpty().withMessage('กรุณาระบุ page เป็นตัวเลข'),
],async(req, res) => {
    try {
        const result = await Device.all({ page: req.query.page});
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ error: error.message });
    }
});

router.get('/search', Auth_admin, [
    query('page').isInt().withMessage('กรุณาระบุ page เป็นตัวเลข'),
    query('id').isInt().withMessage('ระบุ id customer เพื่อหาประวัติการแจ้งซ่อม')
], async (req, res) => {
    try {
        const ErrorsValidation = validationResult(req);
        if (!ErrorsValidation.isEmpty()) {
            const ErrorMsg = ErrorsValidation.array().map((err) => err.msg);
            return res.status(400).json({ message: ErrorMsg });
        }
        const result = await Device.search({ page: req.query.page, id: req.query.id });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ error: error.message });

    }
});

router.post('/create', Auth_admin, [
    body('CustomerId').not().isEmpty().withMessage('กรุณาระบุ CustomerId'),
    body('Images').not().isEmpty().withMessage('กรุณาระบุ Images'),
    body('Brand').not().isEmpty().withMessage('กรุณาระบุ Brand'),
    body('Model').not().isEmpty().withMessage('กรุณาระบุ Model'),
    body('SerialNumber').not().isEmpty().withMessage('กรุณาระบุ SerialNumber'),
    body('Description').not().isEmpty().withMessage('กรุณาระบุ Description')
], async (req, res) => {
    try {

        const ErrorsValidation = validationResult(req);
        if (!ErrorsValidation.isEmpty()) {
            const ErrorMsg = ErrorsValidation.array().map((err) => err.msg);
            return res.status(400).json({ message: ErrorMsg });
        }

        //ตรวจหาตำแหน่งที่ตั้งโฟลเดอร์สำหรับเก็บรูปภาพ
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        // ตรวจหาโฟลเดอร์ทีเก็บรูปที่มีชื่อ device
        if (!fs.existsSync(path.join(uploadDir, 'device'))) {
            fs.mkdirSync(path.join(uploadDir, 'device'));
        }

        const fileName = base64Img.imgSync(req.body.Images, path.join(uploadDir, 'device'), `${Date.now().toString()}`)
        rs_file = fileName;
        req.body.Images = path.basename(fileName);
        const create = await Device.createDevice(req.body);
        return res.status(200).json({
            message: 'Successfully  registered device',
            data: create
        })

    } catch (error) {
        if (rs_file && fs.existsSync(rs_file)) {
            fs.unlinkSync(rs_file);
        }
        return res.status(error.statusCode || 500).json({ error: error.message });
    }
})

router.patch('/updateRepair/:deviceId', Auth_admin, [
    param('deviceId','กรุณาระบุ DevicesId').isInt().not().isEmpty(),
    body('description','description กรุณาระบุรายละเอียดการซ่อม').isString().not().isEmpty(),
    body('Cost','Cost ระบุราคาซ่อม').isInt().not().isEmpty()
], async(req,res) => {
    try{
        const ErrorsValidation = validationResult(req);
        if (!ErrorsValidation.isEmpty()) {
            const ErrorMsg = ErrorsValidation.array().map((err) => err.msg);
            return res.status(400).json({ message: ErrorMsg });
        }
        const updateRepair = await Device.updateRepair({DeviceId:req.params.deviceId,Description:req.body.description, Cost:req.body.Cost});
        return res.status(200).json(updateRepair)
    }catch(e){
      return res.status(e.statusCode || 500).json({ error: e.message });
    } 
});

router.patch('/payment/:RepairId', [
  param('RepairId', 'กรุณาระบุ RepairId').isInt().not().isEmpty(),
  body('amount', 'กรุณาระบุ amount').isInt().not().isEmpty(),
  body('status', 'กรุณาระบุ status ประเภทต่อไปนี้ (เงินสด, โอน, บัตรเครดิต)').isString().not().isEmpty()
], async(req, res) => {
    try{
        const ErrorsValidation = validationResult(req);
        if (!ErrorsValidation.isEmpty()) {
            const ErrorMsg = ErrorsValidation.array().map((err) => err.msg);
            return res.status(400).json({ message: ErrorMsg });
        }
        const item = { RepairId: req.params.RepairId, amount: req.body.amount, status: req.body.status }
        const updatePayment = await Device.updatePayment(item);
        return res.status(200).json(updatePayment)
    }catch(e) {
        return res.status(e.statusCode || 500).json({ error: e.message });
    }
})
router.patch('/updateStatus/:id',  Auth_admin,[
    param('id').not().isEmpty().withMessage('ระบุรหัสของอุปกรณ์'),
    body('status').not().isEmpty().withMessage('กรุณาระบุ status เช่น  แจ้งซ่อม , รอตรวจสอบ , ดำเนินการ , ส่งซ่อม/เคลม , รอผู้แจ้งดำเนินการ , รอส่งซ่อม , สำเร็จ , ยกเลิก  ')
], async (req, res) => {
    try {
        const ErrorsValidation = validationResult(req);
        if (!ErrorsValidation.isEmpty()) {
            const ErrorMsg = ErrorsValidation.array().map((err) => err.msg);
            return res.status(400).json({ message: ErrorMsg });
        }
        const item = { id: req.params.id, status: req.body.status }
        const updateStatus = await Device.updateStatus(item);
        return res.status(200).json({
            message: 'Successfully  update status',
        })
    } catch (error) {
        return res.status(error.statusCode || 500).json({ error: error.message });
    }
});

router.patch('/uploadImage/:id',  Auth_admin,[
    param('id').not().isEmpty().withMessage('Please provide device ID'),
    body('Images').not().isEmpty().withMessage('Please provide an image')
], async (req, res) => {
    try {
        const ErrorsValidation = validationResult(req);
        if (!ErrorsValidation.isEmpty()) {
            const ErrorMsg = ErrorsValidation.array().map((err) => err.msg);
            return res.status(400).json({ message: ErrorMsg });
        }
        const bodyIdValidity = await Device.SearchId(req.params.id)
        if (!bodyIdValidity) {
            return res.status(404).json({ message: 'ไม่พบอุปกรณ์ที่ระบุ' });
        }
        const ImagesOld = path.join(uploadDir, 'device', bodyIdValidity.Images);
        if (fs.existsSync(ImagesOld)) {
            fs.unlinkSync(ImagesOld);
        }
        const fileName = base64Img.imgSync(req.body.Images, path.join(uploadDir, 'device'), `${Date.now().toString()}`)
        rs_file = fileName;
        req.body.Images = path.basename(fileName);
        const updateImage = await Device.updateImage({ id: req.params.id, image: req.body.Images });
        return res.status(200).json({
            message: 'Successfully  edit image',
        })
    } catch (error) {
        if (rs_file && fs.existsSync(rs_file)) {
            fs.unlinkSync(rs_file);
        }
        return res.status(error.statusCode || 500).json({ error: error.message });
    }
})

router.patch('/editDevice/:id', Auth_admin, [
    param('id').not().isEmpty().withMessage('ระบุรหัสของอุปกรณ์'),
    body('Brand').not().isEmpty().withMessage('กรุณาระบุ Brand'),
    body('Model').not().isEmpty().withMessage('กรุณาระบุ Model'),
    body('SerialNumber').not().isEmpty().withMessage('กรุณาระบุ SerialNumber'),
    body('Description').not().isEmpty().withMessage('กรุณาระบุ Description')
], async (req, res) => {
    try {
        const ErrorsValidation = validationResult(req);
        if (!ErrorsValidation.isEmpty()) {
            const ErrorMsg = ErrorsValidation.array().map((err) => err.msg);
            return res.status(400).json({ message: ErrorMsg });
        }
        const bodyIdValidity = await Device.SearchId(req.params.id)
        if (!bodyIdValidity) {
            return res.status(404).json({ message: 'ไม่พบอุปกรณ์ที่ระบุ' });
        }
        const updateDevice = await Device.editDevice({ id: req.params.id, Brand: req.body.Brand, Model: req.body.Model, SerialNumber: req.body.SerialNumber, Description: req.body.Description });
        return res.status(200).json({
            message: 'Successfully  Edit device',
        })
    } catch (error) {
        return res.status(error.statusCode || 500).json({ error: error.message });
    }
});


router.patch('/technnician/:id', Auth_admin, [
    param('id').not().isEmpty().withMessage('ระบุรหัสของอุปกรณ์'),
    body('TechnicianID').not().isEmpty().withMessage('รหัสช่างที่ได้รับมอบหมายงาน')
],async (req, res) => {
    try {
        const ErrorsValidation = validationResult(req);
        if (!ErrorsValidation.isEmpty()) {
            const ErrorMsg = ErrorsValidation.array().map((err) => err.msg);
            return res.status(400).json({ message: ErrorMsg });
        }
        const bodyIdValidity = await Device.SearchId(req.params.id)
        if (!bodyIdValidity) {
            return res.status(404).json({ message: 'ไม่พบอุปกรณ์ที่ระบุ' });
        }
        const updateTechnnician = await Device.updateTechnnician({ id: req.params.id, TechnicianID: req.body.TechnicianID });
        return res.status(200).json({
            message: 'Successfully  add id technician',
        })
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
});

router.delete('/:id',  Auth_admin,[
    param('id').not().isEmpty().withMessage('ระบุรหัสของอุปกรณ์')
], async(req,res) => {
   try {
        const ErrorsValidation = validationResult(req);
        if (!ErrorsValidation.isEmpty()) {
            const ErrorMsg = ErrorsValidation.array().map((err) => err.msg);
            return res.status(400).json({ message: ErrorMsg });
        }
        const bodyIdValidity = await Device.SearchId(req.params.id)
        if (!bodyIdValidity) {
            return res.status(404).json({ message: 'ไม่พบอุปกรณ์ที่ระบุ' });
        }
        const ImagesOld = path.join(uploadDir, 'device', bodyIdValidity.Images);
        if (fs.existsSync(ImagesOld)) {
            fs.unlinkSync(ImagesOld);
        }
        const deleteDevice = await Device.deleteDevice({ id: req.params.id });
        return res.status(200).json({
            message: 'Successfully  Delete device',
        })
   } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
   }
})
export default router