import { DataTypes } from "sequelize";
import db from "../configs/connect.js";

const LineNotify = db.define('tbl_token_lines',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: 'ชื่อประเภท tokens นั้นว่าทำอะไร'
      },
      token: {
        type: DataTypes.STRING(150),
        allowNull: false,
        comment: 'token'
      },
});
LineNotify.sync({alter:true})
export default LineNotify;
