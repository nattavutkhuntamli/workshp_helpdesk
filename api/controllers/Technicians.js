import TechniciansModel from "../models/Technicians.js";
import bcrypt from "bcrypt";

export default {
    all: async (value) => {
        try {
            const page = parseInt(value.page) || 1;
            const limit = 10;
            const technicians = await TechniciansModel.findAll({
                limit: limit,
                offset: (page - 1) * limit,
            });
            return technicians;
        } catch (e) {
            throw { statusCode: 404, message: e.message };
        }
    },
    
    createTechnicians: async (item) => {
        try {
            const isValidateUsername = await TechniciansModel.findOne({
                where: {
                    username: item.username
                }
            });
            if (isValidateUsername) {
                throw { statusCode: 400, message: "Username already exists" };
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(item.password, salt);
            const create = await TechniciansModel.create({
                username: item.username,
                password: hashedPassword,
                FirstName: item.FirstName,
                LastName: item.LastName,
                Email: item.Email,
                Phone: item.Phone,
                token: null,
            });
            const data = {
                message: "success",
                title: "เพิ่มข้อมูลช่างสำเร็จ",
                data:create,
                lastId: create.id,
            }
            return data;
        } catch (e) {
            throw { statusCode: 404, message: e.message };
        }
    },

}