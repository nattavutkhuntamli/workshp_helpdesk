// models/Payment.js
import { DataTypes } from 'sequelize';
import db from "../configs/connect.js";
import Repair from './Repair.js';

/**
 * โมเดลของ Playment นี้ใช้ Sequelize.define() เพื่อสร้างโมเดล Playment ซึ่งอธิบายโครงสร้างของตาราง Playment 
 * โดยใช้ DataTypes ต่างๆ ที่เป็นส่วนหนึ่งของ Sequelize. และกำหนดความสัมพันธ์ระหว่าง Playment และ Repair
 *  ด้วยเมธอด Playment.belongsTo() เพื่อบอก Sequelize ว่ามีความสัมพันธ์กับตาราง Repair ผ่านคีย์ชื่อ RepairID
 *  ตามลำดับ.
 */

const Payment = db.define('tbl_payment', {
  PaymentID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  RepairID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'รหัสการซ่อมที่เกี่ยวข้อง'
  },
  Amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'จำนวนเงินที่ชำระ'
  },
  PaymentDate: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: 'วันที่ชำระเงิน'
  },
  Method:{
    type: DataTypes.ENUM(
      "เงินสด",
      "โอน",
      "บัตรเครดิต",
    ),
  }
}, {
  tableName: 'tbl_Payments',
  timestamps: true,
  comment: 'การชำระเงิน'
});

Payment.sync({alter:true})
export default Payment;
