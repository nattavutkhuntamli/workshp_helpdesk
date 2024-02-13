import { DataTypes } from "sequelize";
import db from "../configs/connect.js";

const Admin = db.define("tbl_admin", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  fullname: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null
  },
  status: {
    type: DataTypes.ENUM('true', 'false'),
    defaultValue: 'true'
  }
},{
  tableName: 'tbl_admin',
  timestamps: true,
  comment: 'แอดมิน'
});
Admin.sync({ alter: true });
export default Admin;
