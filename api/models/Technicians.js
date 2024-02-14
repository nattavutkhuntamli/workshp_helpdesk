import { DataTypes } from "sequelize";
import db from "../configs/connect.js";

const Technicians = db.define("tbl_technicians", {
  TechnicianID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username:{
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: "ชื่อผู้ใช้งาน",
  },
  password:{
    type: DataTypes.STRING(250),
    allowNull: false,
    comment: "รหัสผ่าน",

  },
  FirstName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: "ชื่อจริงของช่าง",
  },
  LastName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: "นามสกุลของช่าง	",
  },
  Email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: "อีเมลของช่าง	",
  },
  Phone: {
    type: DataTypes.STRING(15),
    allowNull: false,
    comment: "หมายเลขโทรศัพท์ของช่าง",
  },
  token:{
    type: DataTypes.STRING(150),
    allowNull: true,
    comment: 'token'
  },
  status: {
    type: DataTypes.ENUM('true', 'false'),
    defaultValue: 'true'
  }
}, {
  // tableName: 'tbl_technicians',
  timestamps: true,
  comment: 'ช่าง'
});
Technicians.sync({alter:true})
export default Technicians;
