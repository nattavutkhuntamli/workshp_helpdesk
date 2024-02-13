import jwt from 'jsonwebtoken';
import { SECRET } from '../configs/configs.js';
import Admin from '../models/Admin.js';

const Auth_admin = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, SECRET);
        const admin = await Admin.findOne({ where: { username: decoded.username } });
        if (!admin || admin.status !== 'true') {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }
        req.admin = {
            id: admin.id,
            username: admin.username,
            fullname: admin.fullname,
            email: admin.email,
            phone: admin.phone,
            address: admin.address,
            token: admin.token , 
            status: admin.status
        };
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
}
export default Auth_admin;