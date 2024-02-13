import Customer from '../models/Customer.js';
import LineNotify from "../models/LineNotify.js";
import axios  from 'axios'

export default {
    all: async (value) => {
        try {
            const page = parseInt(value.page) || 1;
            const limit = 10;
            const offset = (page - 1) * limit;
            
            const query = await Customer.findAndCountAll({
                attributes: ['CustomerID', 'FirstName', 'LastName','Email', 'Phone','Address','createdAt','updatedAt'], // ระบุแอตทริบิวต์ที่ต้องการด��งข้อมูล
                order: [["CustomerID", "DESC"]],
                limit: limit,
                offset: offset,
            });
            
            const totalItems = query.count; // นับจำนวนข้อมูลทั้งหมด
            const totalPages = Math.ceil(totalItems / limit); //คำนว��หา��ำนวนหน้า��ั้งหมด
            const customer = query.rows;

            const data = {
                message:"success",
                title: "ข้อมูลลูกค้า",
                data: customer,
                rows: customer.length,
                page: page,
                totalPages: totalPages,
            }
            return data;
        }catch (e) {
            throw { statusCode: 404, message: e.message };
        }
    },

    create: async(value) => {
        try {
            const checkCustomer = await Customer.findOne({
                where:{ FirstName:value.FirstName, LastName: value.LastName}
            });
            if(checkCustomer){
                throw { statusCode: 400, message: "Customer already exist" };
            }
            const register = await Customer.create({
                FirstName: value.FirstName,
                LastName: value.LastName,
                Email: value.Email,
                Phone: value.Phone,
                Address: value.Address,
            });
            const messageLine = await LineNotify.findOne({
                where: { name: 'เพิ่มข้อมูลแอดมิน' }
            });
            let config = {
                method: 'post',
                url: 'https://notify-api.line.me/api/notify',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${messageLine.token}`
                },
                data: {
                    message: `มีการสมัครสมาชิก customer โดยใช้ชื่อยูส ${register.username} ลงทะเบียน`,
                }
            }
            await axios(config)
            return register;
        }catch (e) {
            throw { statusCode: 404, message: e.message };
        }
    },

    edit: async(id,value) => {
        try {
            const customer = await Customer.findByPk(id);
            if(!customer){
                throw { statusCode: 404, message: "Customer not found" };
            }
            const update = await customer.update({
                FirstName: value.FirstName,
                LastName: value.LastName,
                Email: value.Email,
                Phone: value.Phone,
                Address: value.Address,
            });
            return update;
        }catch (e) {
            throw { statusCode: 404, message: e.message };
        }
    }
}