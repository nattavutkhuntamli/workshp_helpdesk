import express from 'express';
import { query ,param  , check, validationResult } from 'express-validator';
import base64Img from 'base64-img'
import fs from 'fs';
import path from 'path';
import Device from '../controllers/Device.js';
const router = express.Router();

const uploadDir = path.resolve('./public/uploads')
let rs_file;

router.get('/',async(req,res) => {
    return res.status(200).json({
        message: 'Hello World!'
    })
});

router.post('/create',[
    check('CustomerId').not().isEmpty().withMessage('กรุณาระบุ CustomerId'),
    check('Images').not().isEmpty().withMessage('กรุณาระบุ Images'),
    check('Brand').not().isEmpty().withMessage('กรุณาระบุ Brand'),
    check('Model').not().isEmpty().withMessage('กรุณาระบุ Model'),
    check('SerialNumber').not().isEmpty().withMessage('กรุณาระบุ SerialNumber'),
    check('Description').not().isEmpty().withMessage('กรุณาระบุ Description')
],async(req,res) => {
    try{
        
        const ErrorsValidation = validationResult(req);
        if (!ErrorsValidation.isEmpty()) {
            const ErrorMsg = ErrorsValidation.array().map((err) => err.msg);
            return res.status(400).json({ message: ErrorMsg });
        }
        
        //ตรวจหาตำแหน่งที่ตั้งโฟลเดอร์สำหรับเก็บรูปภาพ
        if(!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        // ตรวจหาโฟลเดอร์ทีเก็บรูปที่มีชื่อ device
        if(!fs.existsSync(path.join(uploadDir,'device'))){
            fs.mkdirSync(path.join(uploadDir,'device'));
        }

        const fileName = base64Img.imgSync(req.body.Images, path.join(uploadDir,'device'),`${Date.now().toString()}`)
        rs_file = fileName;
        req.body.Images = path.basename(fileName);
        const create = await Device.createDevice(req.body);
        return res.status(200).json({
            message: 'Successfully  registered device',
            data: create
        })

    } catch (error) {
        if(rs_file && fs.existsSync(rs_file)){
            fs.unlinkSync(rs_file);
        }
        return res.status(error.statusCode || 500).json({ error: error.message });
    }
})

router.patch('/updateStatus/:id', [
    param('id').not().isEmpty().withMessage('ระบุรหัสของอุปกรณ์'),
    check('status').not().isEmpty().withMessage('กรุณาระบุ status เช่น  แจ้งซ่อม , รอตรวจสอบ , ดำเนินการ , ส่งซ่อม/เคลม , รอผู้แจ้งดำเนินการ , รอส่งซ่อม , สำเร็จ , ยกเลิก  ')
], async (req, res) => {
   try {
     const ErrorsValidation = validationResult(req);
      if (!ErrorsValidation.isEmpty()) {
         const ErrorMsg = ErrorsValidation.array().map((err) => err.msg);
         return res.status(400).json({ message: ErrorMsg });
      }
      const item = { id: req.params.id, status:req.body.status}
      const updateStatus = await Device.updateStatus(item);
      return res.status(200).json({
         message: 'Successfully  update status',
      })
   } catch (e) {
    return res.status(error.statusCode || 500).json({ error: error.message });
   }
})
export default router