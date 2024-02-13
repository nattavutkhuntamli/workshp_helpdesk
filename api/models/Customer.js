import { DataTypes } from "sequelize";
import db from "../configs/connect.js";

const Customer = db.define("tbl_Customer", {
  CustomerID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  FirstName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: "ชื่อจริงของลูกค้า",
  },
  LastName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: "นามสกุลของลูกค้า",
  },
  Email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: "อีเมลของลูกค้า",
  },
  Phone: {
    type: DataTypes.STRING(15),
    allowNull: false,
    comment: "หมายเลขโทรศัพท์ของลูกค้า",
  },
  Address: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: "ที่อยู่ของลูกค้า",
  },
}, {
  tableName: 'tbl_customers',
  timestamps: true,
  comment: 'ลูกค้า'
});
Customer.sync({alter:true})
export default Customer;
