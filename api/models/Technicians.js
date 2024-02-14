import { DataTypes } from "sequelize";
import db from "../configs/connect.js";

const Technicians = db.define("tbl_technicians", {
  TechnicianID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
}, {
  // tableName: 'tbl_technicians',
  timestamps: true,
  comment: 'ช่าง'
});
Technicians.sync({alter:true})
export default Technicians;
