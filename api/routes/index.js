import express from 'express';
import AdminRouter  from './Admin.js';

import CustomerRouter from './Customer.js';
import DeviceRouter from './Device.js';
import TechniciansRouter from './Technicians.js';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.use('/admin',AdminRouter);
router.use('/customer',CustomerRouter);
router.use('/device',DeviceRouter);
router.use('/technicians',TechniciansRouter);

export default router;