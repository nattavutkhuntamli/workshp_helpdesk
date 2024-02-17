import Device from "../models/Device.js";
import Customer from "../models/Customer.js";

export default {
    all: async (value) => {
        try {
            const page = parseInt(value.page) || 1;
            const limit = 10;
            const offset = (page - 1) * limit;
            Device.belongsTo(Customer, {
                foreignKey: "CustomerID",
            });
            const { count: totalItems, rows: device } = await Device.findAndCountAll({
                include: [
                    {
                        model: Customer,
                        attributes: ['FirstName', 'LastName', 'Email', 'Phone', 'Address'],
                    }
                ],
                order: [["DeviceID", "DESC"]],
                limit: limit,
                offset: offset,
            });
            const totalPages = Math.ceil(totalItems / limit);
            const dataDevice = device.map(item => ({
                DeviceID: item.DeviceID,
                CustomerID: item.CustomerID,
                TechnicianID: item.TechnicianID,
                Fullname: `${item.tbl_customer.FirstName} ${item.tbl_customer.LastName}`,
                Email: item.tbl_customer.Email,
                Phone: item.tbl_customer.Phone,
                Images: item.Images,
                Brand: item.Brand,
                Model: item.Model,
                SerialNumber: item.SerialNumber,
                Description: item.Description,
                status: item.status,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
            }));

            if (dataDevice.length === 0) {
                throw { statusCode: 404, message: "Device not found" };
            } else {
                const data = {
                    message: "success",
                    title: "ข้อมูลการแจ้งซ่อม",
                    data: dataDevice,
                    rows: dataDevice.length,
                    page: page,
                    totalPages: totalPages,
                }
                return data;
            }
        } catch (e) {
            throw { statusCode: e.statusCode || 500, message: e.message || "Internal Server Error" };
        }
    },

    search: async (value) => {
        try {
            const page = parseInt(value.page) || 1;
            const limit = 10;
            const offset = (page - 1) * limit;
            const query = await Device.findAndCountAll({
                where: { CustomerID: value.id },
                order: [["CustomerID", "DESC"]],
                limit: limit,
                offset: offset,
            });
            const totalItems = query.count; // นับจำนวนข้อมูลทั้งหมด
            const totalPages = Math.ceil(totalItems / limit); // คำนวณจำนวนหน้าทั้งหมด
            const device = query.rows;
            if (device.length === 0) {
                throw { statusCode: 404, message: "Device not found" };
            } else {
                const data = {
                    message: "success",
                    title: "ข้อมูลการแจ้งซ่อม",
                    data: device,
                    rows: device.length,
                    page: page,
                    totalPages: totalPages,
                }
                return data;
            }
        } catch (e) {
            throw { statusCode: e.statusCode, message: e.message };
        }
    },
    createDevice: async (item) => {
        try {
            const customer = await Customer.findOne({
                where: { CustomerID: item.CustomerId }
            });
            if (!customer) {
                throw { statusCode: 404, message: "Customer not found" };
            }
            const CreateDevice = await Device.create({
                CustomerID: item.CustomerId,
                Images: item.Images,
                Brand: item.Brand,
                Model: item.Model,
                SerialNumber: item.SerialNumber,
                Description: item.Description,
            })
            if (!CreateDevice) {
                throw { statusCode: 404, message: " Create Device false" };
            }
            return CreateDevice;
        } catch (e) {
            throw { statusCode: 404, message: e.message };
        }
    },
    SearchId: async (id) => {
        try {
            const SearchId = await Device.findOne({
                where: { DeviceID: id }
            });
            if (!SearchId) {
                throw { statusCode: 404, message: " Device not found" };
            }
            return SearchId;
        } catch (e) {
            throw { statusCode: e.statusCode, message: e.message };
        }
    },
    updateImage: async (item) => {
        try {
            const findOneDevice = await Device.findOne({
                where: { DeviceID: item.id }
            });
            if (!findOneDevice) {
                throw { statusCode: 404, message: " Device not found" };
            }
            const UpdateDevice = await Device.update({
                Images: item.image,
            }, {
                where: {
                    DeviceID: item.id
                }
            })
            if (!UpdateDevice) {
                throw { statusCode: 404, message: " Update Images Device false" };
            }
            return UpdateDevice;
        } catch (e) {
            throw { statusCode: 404, message: e.message };
        }
    },
    updateStatus: async (item) => {
        try {
            const findOneDevice = await Device.findOne({
                where: { DeviceID: item.id }
            });
            if (!findOneDevice) {
                throw { statusCode: 404, message: " Device not found" };
            }
            const UpdateDevice = await Device.update({
                status: item.status,
            }, {
                where: {
                    DeviceID: item.id
                }
            })
            if (!UpdateDevice) {
                throw { statusCode: 404, message: " Update Device false" };
            }
            return UpdateDevice;
        } catch (e) {
            throw { statusCode: 404, message: e.message };
        }
    },
    updateData: async (item) => {
        try {
            const UpdateDevice = await Device.update({
                Brand: item.Brand,
                Model: item.Model,
                SerialNumber: item.SerialNumber,
                Description: item.Description,
            }, {
                where: {
                    DeviceID: item.id
                }
            })
            if (!UpdateDevice) {
                throw { statusCode: 404, message: " Update Device false" };
            }
            return UpdateDevice;
        } catch (e) {
            throw { statusCode: e.statusCode, message: e.message };
        }
    },

    updateTechnnician: async (item) => {
        try {
            const UpdateDevice = await Device.update({
                TechnicianID: item.TechnicianID,
            }, {
                where: {
                    DeviceID: item.id
                }
            })
            if (!UpdateDevice) {
                throw { statusCode: 404, message: " Update Device false" };
            }
            return UpdateDevice;
        } catch (e) {
            throw { statusCode: 404, message: e.message };
        }
    },

    deleteDevice: async (item) => {
        try {
            const DeleteDevice = await Device.destroy({
                where: {
                    DeviceID: item.id
                }
            })
            if (!DeleteDevice) {
                throw { statusCode: 404, message: " Delete Device false" };
            }
            return DeleteDevice;
        } catch (e) {
            throw { statusCode: e.statusCode, message: e.message };
        }
    }
}