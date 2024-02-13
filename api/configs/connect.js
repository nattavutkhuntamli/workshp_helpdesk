import { Sequelize } from "sequelize";
import { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_DRIVER } from "./configs.js";

 const sequelize = new Sequelize(DB_NAME , DB_USER, DB_PASS,{
    dialect: DB_DRIVER,
    host: DB_HOST,
});

export default sequelize;