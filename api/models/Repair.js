// models/Repair.js
import { DataTypes } from 'sequelize';
import db from "../configs/connect.js";
import Device from './Device.js';
import Technicians from './Technicians.js'
/**
 * โมเดลของ Repairs นี้ใช้ Sequelize.define() เพื่อสร้างโมเดล Repair ซึ่งอธิบายโครงสร้างของตาราง Repairs 
 * โดยใช้ DataTypes ต่างๆ ที่เป็นส่วนหนึ่งของ Sequelize. และกำหนดความสัมพันธ์ระหว่าง Repair และ Customer, Device
 *  ด้วยเมธอด Repair.belongsTo() เพื่อบอก Sequelize ว่ามีความสัมพันธ์กับตาราง Customers, Devices ผ่านคีย์ชื่อ CustomerID, DeviceID
 *  ตามลำดับ.
 */

const Repair = db.define('tbl_repair', {
  RepairID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'รหัสของงานซ่อม'
  },
  DeviceID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'รหัสของอุปกรณ์ที่ต้องการซ่อม'
  },
  RepairDate: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: 'วันที่ทำการซ่อม'
  },
  TechnicianID:{
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'รหัสของช่างที่รับผิดชอบการซ่อม'
  },
  Description: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'รายละเอียดการซ่อม'
  },
  Cost:{
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'จำนวนเงินที่ชำระ'
  },
}, {
  tableName: 'tbl_Repairs',
  timestamps: true,
  comment: 'งานซ่อม'
});
Repair.sync({alter:true})
export default Repair;
