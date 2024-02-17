
import express from 'express';
import { body, query ,param,  validationResult } from 'express-validator';

import AdminController from '../controllers/Admin.js'
import Auth_admin from '../middleware/Auth_admin.js';

const router = express.Router();

router.get('/',Auth_admin, [
    query('page').isInt().withMessage('กรุณาระบุ page เป็นตัวเลข')
],  async (req, res) => {
    try {
        const ErrorsValidation = validationResult(req);
        if (!ErrorsValidation.isEmpty()) {
            const ErrorMsg = ErrorsValidation.array().map((err) => err.msg);
            return res.status(400).json({ message: ErrorMsg });
        }
        const admins = await AdminController.all(req.query);
        return res.status(200).json(admins);
    } catch (error) {
        console.error(error.message);
        return res.status(error.statusCode || 500).json({ error: error.message });
    }
});

router.get('/checkAuth', Auth_admin, async (req, res) => {
    return res.status(200).json({
        message: 'Successfully logged in',
        data: req.admin
    })
})

router.post('/register', Auth_admin, [
    body('username', 'Username is required').not().isEmpty(),
    body('password', '<PASSWORD>').not().isEmpty(),
    body('fullname', 'Fullname is required').not().isEmpty(),
    body('email', 'Email is required').not().isEmpty(),
    body('Email').notEmpty().withMessage('กรุณาระบุอีเมล').isEmail().withMessage('รูปแบบอีเมลไม่ถูกต้อง'),
    body('phone', 'Phone is required').not().isEmpty(),
    body('address', 'Address is required').not().isEmpty()
],  async (req, res) => {
    try {
        const ErrorsValidation = validationResult(req);
        if (!ErrorsValidation.isEmpty()) {
            const ErrorMsg = ErrorsValidation.array().map((err) => err.msg);
            return res.status(400).json({ message: ErrorMsg });
        }
        const register = await AdminController.Register(req.body);
        return res.status(200).json({
            message: 'Successfully registered',
            data: register
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ error: error.message });
    }
})


router.post('/login', [
    body('username', 'Username is required').not().isEmpty(),
    body('password', '<PASSWORD>').not().isEmpty()
], async (req, res) => {
    try {
        const Validation = await validationResult(req)
        if (!Validation.isEmpty()) {
            return res.status(400).json({ error: Validation.array()[0].msg });
        }
        const login = await AdminController.Login(req.body);
        return res.status(200).json({
            status: 200,
            message: 'Successfully logged in',
            data: {
                id: login.id,
                username: login.username,
                fullname: login.fullname,
                email: login.email,
                phone: login.phone,
                address: login.address,
                token: login.token,
                status: login.status,
            }
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ error: error.message });
    }
})


router.patch('/editProfile/:id', Auth_admin, [
    param('id', 'ระบุรหัสของ id').not().isEmpty(),
    body('fullname', 'Fullname is required').not().isEmpty(),
    body('email', 'Email is required').not().isEmpty(),
    body('phone', 'Phone is required').not().isEmpty(),
    body('address', 'Address is required').not().isEmpty()
], async (req, res) => {
    try {
        const ErrorsValidation = validationResult(req);
        if (!ErrorsValidation.isEmpty()) {
            const ErrorMsg = ErrorsValidation.array().map((err) => err.msg);
            return res.status(400).json({ message: ErrorMsg });
        }
        const updateProfile = await AdminController.updateProfile({ id: req.params.id, fullname: req.body.fullname, email: req.body.email, phone: req.body.phone, address: req.body.address });
        return res.status(200).json({
            message: 'Successfully updated profile',
        })

    } catch (error) {
        return res.status(error.statusCode || 500).json({ error: error.message });
    }
})

router.patch('/editPassword/:id', Auth_admin, [
    param('id', 'ระบุรหัสของ id').not().isEmpty(),
    body('password', '<PASSWORD>').not().isEmpty()
], async (req, res) => {
    try {
        const ErrorsValidation = validationResult(req);
        if (!ErrorsValidation.isEmpty()) {
            const ErrorMsg = ErrorsValidation.array().map((err) => err.msg);
            return res.status(400).json({ message: ErrorMsg });
        }
        const updatePassword = await AdminController.updatePassword({ id: req.params.id, password: req.body.password });
        return res.status(200).json({
            message: 'Successfully updated password',
        })
    } catch (error) {
        return res.status(error.statusCode || 500).json({ error: error.message });
    }
})

export default router;