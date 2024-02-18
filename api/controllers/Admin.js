import Admin from "../models/Admin.js";
import LineNotify from "../models/LineNotify.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET } from "../configs/configs.js";
import axios  from 'axios'
export default {
  all: async (value) => {
    try {
        const page = parseInt(value.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;


        const  { count:totalItems, rows: admin} = await Admin.findAndCountAll({
          attributes: ['id', 'username','fullname', 'email','phone', 'address','status','token','createdAt','updatedAt'],
          order: [["id", "DESC"]],
          limit: limit,
          offset: offset,
        });
        const totalPages = Math.ceil(totalItems / limit); //คำนว��หา��ำนวนหน้า��ั้งหมด
        const dataAdmin = admin.map(item => ({
            id: item.id,
            username: item.username,
            fullname: item.fullname,
            email: item.email,
            phone: item.phone,
            address: item.address,
            status: item.status,
            token: item.token,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        }))
        if(dataAdmin.length === 0) {
          throw { statusCode: 404, message: "Admin not found" };
        }else {
          return {
            message:"success",
            title: "ข้อมูลสมาชิก",
            data: dataAdmin,
            rows: dataAdmin.length,
            page: page,
            totalPages: totalPages,
          };
        }
    } catch (error) {
      throw { statusCode: error.statusCode || 400, message: error.message };
    }
  },

  Register: async (item) => {
    try {
      const { username, password, fullname, email, phone, address } = item;
      const specificUser = await Admin.findOne({
        where: { username: username },
      });
      if (specificUser) {
        throw { statusCode: 400, message: "Username already exists" };
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const Register = await Admin.create({
        username: username,
        password: hashedPassword,
        fullname: fullname,
        email: email,
        phone: phone,
        address: address,
        token: null,
      });
      if (!Register) {
        throw { statusCode: 400, message: "Something went wrong" };
      } else {
        // const messageLine = await LineNotify.findOne({
        //     where: { name: 'เพิ่มข้อมูลแอดมิน' }
        // });
        // let config = {
        //     method: 'post',
        //     url: 'https://notify-api.line.me/api/notify',
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //         'Authorization': `Bearer ${messageLine.token}`
        //     },
        //     data: {
        //         message: `มีการสมัครสมาชิก admin โดยใช้ชื่อยูส ${Register.username} ลงทะเบียน`,
        //         title: 'Account Created',
        //     }
        // }
        // await axios(config)
        return Register;
      }
    } catch (error) {
      throw { statusCode: 404, message: error.message };
    }
  },
  
  Login: async (item) => {
    try {
      const { username, password } = item; //รับค่า username password จาก req.body ที่ router
      // ค้นหา username นี้มีอยู่ในฐานข้อมูลหรือไม่
      const specificUser = await Admin.findOne({
        where: { username: username },
      });
      // ถ้าไไม่มี
      if (!specificUser) {
        throw { statusCode: 400, message: "Username does not exist" };
      }
      // ถ้า status !=true
      if (specificUser.status !== "true") {
        throw { statusCode: 400, message: "Your account is not active" };
      } else {
        const isMatch = await bcrypt.compare(password, specificUser.password);
        if (!isMatch) {
          throw { statusCode: 400, message: "Password does not match" };
        }
        const token = jwt.sign({ username: specificUser.username }, SECRET, {
          expiresIn: "1h",
        });
        const saveToken = await Admin.update(
          { token: token },
          {
            where: { id: specificUser.id },
          }
        );
        
        specificUser.token = token;
        return specificUser;
      }
    } catch (error) {
      throw { statusCode: 400, message: error.message };
    }
  },

  updatePassword: async(item) => {
    try {
      const  isValidateId = await Admin.findOne({
        where: { id: item.id }
      })
      if (!isValidateId) {
        throw { statusCode: 404, message: "User not found" };
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(item.password, salt);
      const updatePassword = await Admin.update(
        { password:hashedPassword },
        {
          where: { id: item.id }
        }
      )
      return {
        statusCode: 200,
        message: "Update password success"
      }
    } catch (error) {
      throw { statusCode: 400, message: error.message };
    }
  },
  updateProfile: async(item)=>{
    try {
      const  isValidateId = await Admin.findOne({
        where: { id: item.id }
      })
      if (!isValidateId) {
        throw { statusCode: 404, message: "User not found" };
      }
      const updateProfile = await Admin.update(
        { fullname:item.fullname, email:item.email, phone:item.phone, address:item.address },
        {
          where: { id: item.id }
        }
      )
      return {
        statusCode: 200,
        message: "Update profile success"
      }
    } catch (error) {
      throw { statusCode: 400, message: error.message };

    }
  }
};
