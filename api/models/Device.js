import { DataTypes } from "sequelize";
import db from "../configs/connect.js";
const Device = db.define("tbl_device", {
  DeviceID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  CustomerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "รหัสลูกค้า",
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
  tableName: 'tbl_devices',
  timestamps: true,
  comment: 'อุปกรณ์'
});
Device.sync({ alter: true });
export default Device;
