import  Device from "../models/Device";
import  Customer from "../models/Customer.js";

export default {
    create : async(item) =>{
        try {
            const customer = await Customer.findByPk(item.id);
            if(!customer){
                throw { statusCode: 404, message: "Customer not found" };
            }
            const CreateDevice = await Device.create({
                CustomerId:item.id,
                Brand:item.brand,
                Model:item.model,
                SerialNumber:item.serialNumber,
                Description:item.description,
            })
            if(!CreateDevice){
                throw { statusCode: 404, message: " Create Device false" };
            }
            return CreateDevice;
        } catch (e) {
            throw { statusCode: 404, message: e.message };
        }
    }
}