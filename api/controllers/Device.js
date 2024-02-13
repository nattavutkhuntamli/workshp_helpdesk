import  Device from "../models/Device.js";
import  Customer from "../models/Customer.js";

export default {
    createDevice : async(item) =>{
        try {
            const customer = await Customer.findOne({
                where:{ CustomerID: item.CustomerId}
            });
            if(!customer){
                throw { statusCode: 404, message: "Customer not found" };
            }
            const CreateDevice = await Device.create({
                CustomerId:item.CustomerId,
                Images:item.Images,
                Brand:item.Brand,
                Model:item.Model,
                SerialNumber:item.SerialNumber,
                Description:item.Description,
            })
            if(!CreateDevice){
                throw { statusCode: 404, message: " Create Device false" };
            }
            return CreateDevice;
        } catch (e) {
            throw { statusCode: 404, message: e.message };
        }
    },

    updateStatus : async(item) =>{
        try {
            console.log(item)
            const findOneDevice = await Device.findOne({
                where:{ DeviceID : item.id}
            });
            if(!findOneDevice){
                throw { statusCode: 404, message: " Device not found" };
            }
            const UpdateDevice = await Device.update({
                status:item.status,
            },{
                where:{
                    DeviceID:item.id
                }
            })
            if(!UpdateDevice){
                throw { statusCode: 404, message: " Update Device false" };
            }
            return UpdateDevice;
        } catch (e) {
            throw { statusCode: 404, message: e.message };
        }

    }
}