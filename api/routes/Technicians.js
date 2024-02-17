import express from 'express';
import { body, query ,param,  validationResult } from 'express-validator';
import TechniciansController from '../controllers/Technicians.js';
import Auth_Technicians from '../middleware/Auth_Technicians.js';

const router = express.Router();


router.get('/' , [
    query('page').isInt().withMessage('ระบุ page เป็นตัวเลข')
], async (req, res) => {
    try {
        const ErrorsValidation = validationResult(req);
        if (!ErrorsValidation.isEmpty()) {
            const ErrorMsg = ErrorsValidation.array().map((err) => err.msg);
            return res.status(400).json({ message: ErrorMsg });
        }
        const getTechnicians = await TechniciansController.all(req.query);
        return res.status(201).json(getTechnicians);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
})

router.post('/login',[
    body('username').isString().not().isEmpty().withMessage('กรุณาระบุ username'),
    body('password').isString().not().isEmpty().withMessage('กรุณาระบุ password')
], async(req,res) => {
    try {
        const ErrorsValidation = validationResult(req);
        if (!ErrorsValidation.isEmpty()) {
            const ErrorMsg = ErrorsValidation.array().map((err) => err.msg);
            return res.status(400).json({ message: ErrorMsg });
        }
        const loginTechnicians = await TechniciansController.loginTechnicians({
            username: req.body.username,
            password: req.body.password
        });
        return res.status(201).json(loginTechnicians);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
    
})

router.post('/create', [
    body('username').isString().not().isEmpty().withMessage('กรุณาระบุ username'),
    body('password').isString().not().isEmpty().withMessage('กรุณาระบุ password'),
    body('FirstName').isString().not().isEmpty().withMessage('กรุณาระบุ fullname'),
    body('LastName').isString().not().isEmpty().withMessage('กรุณาระบุ fullname'),
    body('Email').notEmpty().withMessage('กรุณาระบุอีเมล').isEmail().withMessage('รูปแบบอีเมลไม่ถูกต้อง'),
    body('Phone').isString().not().isEmpty().withMessage('กรุณาระบุ phone'),
], async(req,res) => {
    try {
        const ErrorsValidation = validationResult(req);
        if (!ErrorsValidation.isEmpty()) {
            const ErrorMsg = ErrorsValidation.array().map((err) => err.msg);
            return res.status(400).json({ message: ErrorMsg });
        }
        const createTechnicians = await TechniciansController.createTechnicians({
            username: req.body.username,
            password: req.body.password,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            Phone: req.body.Phone
        });
        return res.status(201).json(createTechnicians);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
});

router.patch('/editProfile/:id',  Auth_Technicians , [
    param('id', 'ระบุรหัสของ id').isInt().not().isEmpty(),
    body('FirstName').isString().not().isEmpty().withMessage('กรุณาระบุ FirstName'),
    body('LastName').isString().not().isEmpty().withMessage('กรุณาระบุ LastName'),
    body('Email').notEmpty().withMessage('กรุณาระบุอีเมล').isEmail().withMessage('รูปแบบอีเมลไม่ถูกต้อง'),
    body('Phone').isString().not().isEmpty().withMessage('กรุณาระบุ phone'),
], async(req,res) => {
    try {
        const ErrorsValidation = validationResult(req);
        if (!ErrorsValidation.isEmpty()) {
            const ErrorMsg = ErrorsValidation.array().map((err) => err.msg);
            return res.status(400).json({ message: ErrorMsg });
        }
        const  createTechnicians = await TechniciansController.editTechnicians({ 
            id: req.params.id, FirstName:req.body.FirstName,
            LastName:req.body.LastName, Email:req.body.Email,
            Phone:req.body.Phone
        });
        return res.status(200).json(createTechnicians);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
});

router.patch('/editPassword/:id', Auth_Technicians , [
    param('id', 'ระบุรหัสของ id').isInt().not().isEmpty(),
    body('password').isString().not().isEmpty().withMessage('กรุณาระบุ password'),
], async(req, res) => {
    try {
        const ErrorsValidation = validationResult(req);
        if (!ErrorsValidation.isEmpty()) {
            const ErrorMsg = ErrorsValidation.array().map((err) => err.msg);
            return res.status(400).json({ message: ErrorMsg });
        }
        const updatePassword = await TechniciansController.updatePassword({ id: req.params.id, password: req.body.password });
        return res.status(200).json(updatePassword);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
});

router.patch('/updateStatus/:id', [
    param('id', 'ระบุรหัสของ id').isInt().not().isEmpty(),
    body('status').isString().not().isEmpty().withMessage('กรุณาระบุ status'),
] , async(req, res) => {
    try{
        const ErrorsValidation = validationResult(req);
        if (!ErrorsValidation.isEmpty()) {
            const ErrorMsg = ErrorsValidation.array().map((err) => err.msg);
            return res.status(400).json({ message: ErrorMsg });
        }
        const updateStatus = await TechniciansController.updateStatus({ id: req.params.id, status: req.body.status });
        return res.status(200).json(updateStatus);

    }catch (error) {
        return res.status(error.statusCode || 500).json({ error: error.message });
    }
});

export default router