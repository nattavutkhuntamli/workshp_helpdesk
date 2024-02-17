import TechniciansModel from "../models/Technicians.js";
import bcrypt from "bcrypt";
import { SECRET } from "../configs/configs.js";
import jwt from "jsonwebtoken";

export default {

    all: async (value) => {
        try {
            const page = parseInt(value.page) || 1;
            const limit = 10;
            const offset =  (page - 1) * limit;

            const query = await TechniciansModel.findAndCountAll({
                order: [["TechnicianID ", "DESC"]],
                limit: limit,
                offset: offset,
            });
            const totalItems = query.count; // นับจำนวนข้อมูลทั้งหมด
            const totalPages = Math.ceil(totalItems / limit);
            const technicians = query.rows;
            return  {
                message: "success",
                title: "ข้อมูลการแจ้งซ่อม",
                data: technicians,
                rows: technicians.length,
                page: page,
                totalPages: totalPages,
            }
        } catch (e) {
            throw { statusCode: 404, message: e.message };
        }
    },
    
    loginTechnicians: async (item) => {
        try {
            const { username, password } = item; //รับค่า username password จาก req.body ที่ router
            // // ค้นหา username นี้มีอยู่ในฐานข้อมูลหรือไม่
            const specificUser = await TechniciansModel.findOne({
              where: { username: username },
            });
            // // ถ้าไไม่มี
            if (!specificUser) {
              throw { statusCode: 400, message: "Username does not exist" };
            }
            // // ถ้า status !=true
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
              const saveToken = await TechniciansModel.update(
                { token: token },
                {
                  where: { TechnicianID: specificUser.TechnicianID },
                }
              );
              
              specificUser.token = token;
              return specificUser;
            }
          } catch (error) {
            throw { statusCode: 400, message: error.message };
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

    editTechnicians: async (item) => {
        try {
            const technicians = await TechniciansModel.findByPk(item.id);
            if (!technicians) {
                throw { statusCode: 404, message: "Technicians not found" };
            } else {
               
                const update = await technicians.update({
                    FirstName:item.FirstName,
                    LastName:item.LastName,
                    Email:item.Email,
                    Phone:item.Phone,
                }, {
                    where: {
                        TechnicianID:item.id
                    }
                })
                if(!update){
                    throw { statusCode: 404, message: "Update technicians false" };
                }else{
                    return {
                        message: "Update technicians success",
                        title: "อัพเดทข้อมูล technicians สำเร็จ",
                    }
                }
            }
        }catch (e) {
            throw { statusCode: 404, message: e.message };
        }
    },

    updatePassword: async(item) => {
        try {
          const  isValidateId = await TechniciansModel.findOne({
            where: { TechnicianID: item.id }
          })
          if (!isValidateId) {
            throw { statusCode: 404, message: "Technicians not found" };
          }
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(item.password, salt);
          const updatePassword = await TechniciansModel.update(
             { password:hashedPassword },
            {
              where: { TechnicianID: item.id }
            }
          )
          return {
            statusCode: 200,
            message: "Update password success"
          }
        } catch (error) {
          throw { statusCode: 404, message: error.message };
        }
    },
    updateStatus: async(item) => {
        try {
            const isValidateId = await TechniciansModel.findByPk(item.id);
            if (!isValidateId) {
                throw { statusCode: 404, message: "Technicians not found" };
            }
            const updateStatus = await TechniciansModel.update(
                { status:item.status },
                {
                    where: {
                        TechnicianID:item.id
                    }
                }
            );
            if(!updateStatus){
                throw { statusCode: 404, message: "Update technicians false" };
            }else{
                return {
                    message: "Update technicians success",
                    title: "อัพเดทข้อมูล technicians สำเร็จ",
                }
            }

        } catch ( e) {
           throw { statusCode: 404, message: e.message };
        }
    }
}