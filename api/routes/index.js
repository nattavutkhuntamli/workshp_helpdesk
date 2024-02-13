import express from 'express';
/**
 *  import Router
 */
import AdminRouter  from './Admin.js';
import CustomerRouter from './Customer.js';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.use('/admin',AdminRouter);
router.use('/customer',CustomerRouter);

export default router;