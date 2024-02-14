import express from 'express';
import { query , check, validationResult } from 'express-validator';
import TechniciansController from '../controllers/Technicians.js';
const router = express.Router();


router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.post('/create', [
    check('username').not().isEmpty().withMessage('กรุณาระบุ username'),
    check('password').not().isEmpty().withMessage('กรุณาระบุ password'),
    check('FirstName').not().isEmpty().withMessage('กรุณาระบุ fullname'),
    check('LastName').not().isEmpty().withMessage('กรุณาระบุ fullname'),
    check('Email').not().isEmpty().withMessage('กรุณาระบุ email'),
    check('Phone').not().isEmpty().withMessage('กรุณาระบุ phone'),
], async(req,res) => {
    try {
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

export default router