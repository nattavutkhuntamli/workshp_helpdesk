import TechniciansModel from "../models/Technicians";

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
            const technicians = await TechniciansModel.create(item);
            return technicians;
        } catch (e) {
            throw { statusCode: 404, message: e.message };
        }
    },

}