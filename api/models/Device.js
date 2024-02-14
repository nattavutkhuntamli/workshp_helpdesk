import { DataTypes, ABSTRACT, DatabaseError } from "sequelize";
import sequelize  from "../configs/connect.js";
import Customer from "./Customer.js";
import Technicians from "./Technicians.js";
import Payment from "./Payment.js";
const Device = sequelize.define("tbl_devices", {
  DeviceID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  CustomerID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "รหัสลูกค้า",
  },
  TechnicianID:{
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'รหัสของช่าง'
  },
  Images: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: "รูปของอุปกรณ์",
  },
  Brand: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: "ยี่ห้อของอุปกรณ์",
  },
  Model: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: "รุ่นของอุปกรณ์",
  },
  SerialNumber: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: "หมายเลขซีเรียลของอุปกรณ์",
  },
  Description: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: "คำอธิบายเกี่ยวกับอุปกรณ์",
  },
  status: {
    type: DataTypes.ENUM(
      "แจ้งซ่อม",
      "รอตรวจสอบ",
      "ดำเนินการ",
      "ส่งซ่อม/เคลม",
      "รอผู้แจ้งดำเนินการ",
      "รอส่งซ่อม",
      "สำเร็จ",
      "ยกเลิก"
    ),
    defaultValue: "แจ้งซ่อม",
  },
}, {
  // modelName: 'Device',
  // tableName: 'tbl_devices',
  timestamps: true,
  comment: 'อุปกรณ์'
});

// กำหนดความสัมพันธ์กับโมเดล Customer
Device.sync({ alter: true });
export default Device;
