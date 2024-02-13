import express from 'express';
import { query , check, param, validationResult } from 'express-validator';
import Customer from '../controllers/Customer.js';
import Auth_admin from '../middleware/Auth_admin.js';
const router = express.Router();

router.get('/',[
    query('page').isInt().withMessage('กรุณาระบุ page เป็นตัวเลข')
],Auth_admin, async(req, res) => {
    try {
        const ErrorsValidation = validationResult(req);
        if (!ErrorsValidation.isEmpty()) {
            const ErrorMsg = ErrorsValidation.array().map((err) => err.msg);
            return res.status(400).json({ message: ErrorMsg });
        }
        const customers = await Customer.all(req.query); 
        return res.status(200).json(customers);
    } catch (error) {
        console.error(error.message);
        return res.status(error.statusCode || 500).json({ error: error.message });
    }
});

router.post('/create',[
    check('FirstName').not().isEmpty().withMessage('กรุณาระบุ FirstName'),
    check('LastName').not().isEmpty().withMessage('กรุณาระบุ LastName'),
    check('Email').not().isEmpty().withMessage('กรุณาระบุ Email'),
    check('Phone').not().isEmpty().withMessage('กรุณาระบุ Phone'),
    check('Address').not().isEmpty().withMessage('กรุณาระบุ Address')
], Auth_admin, async(req, res) => {
   try {
      const ErrorsValidation = validationResult(req);
      if (!ErrorsValidation.isEmpty()) {
         const ErrorMsg = ErrorsValidation.array().map((err) => err.msg);
         return res.status(400).json({ message: ErrorMsg });
      }
      const create = await Customer.create(req.body);
      return res.status(200).json({
        message: 'Successfully registered',
        data: create
       });
   } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
   }
});

router.patch('/edit/:id', [
    param('id').not().isEmpty().withMessage('The id parameter is required.'),
    check('FirstName').not().isEmpty().withMessage('กรุณาระบุ FirstName'),
    check('LastName').not().isEmpty().withMessage('กรุณาระบุ LastName'),
    check('Email').not().isEmpty().withMessage('กรุณาระบุ Email'),
    check('Phone').not().isEmpty().withMessage('กรุณาระบุ Phone'),
    check('Address').not().isEmpty().withMessage('กรุณาระบุ Address')
], async(req, res) => {
  try {
    const ErrorsValidation = validationResult(req);
    if (!ErrorsValidation.isEmpty()) {
      const ErrorMsg = ErrorsValidation.array().map((err) => err.msg);
      return res.status(400).json({ message: ErrorMsg });
    }
    const update = await Customer.edit(req.params.id, req.body);
    return res.status(200).json({
      message: 'Successfully updated',
      data: update
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
});
export default router;