import jwt from 'jsonwebtoken';
import { SECRET } from '../configs/configs.js';
import TechniciansModels from '../models/Technicians.js';
const Auth_Technicians = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, SECRET);
        const Technicians = await TechniciansModels.findOne({ where: { username: decoded.username } });
        if (!Technicians || Technicians.status !== 'true') {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }
        req.admin = {
            id: Technicians.id,
            username: Technicians.username,
            fullname: Technicians.FirstName + ' ' + Technicians.LastName,
            email: Technicians.Email,
            phone: Technicians.Phone,
            token: Technicians.token , 
            status: Technicians.status
        };
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
}
export default Auth_Technicians;