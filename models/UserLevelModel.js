import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const UserLevels = db.define('UserLevels', {
    nama:{
        type: DataTypes.STRING
    }
},
{
    freezeTableName: true
});

export default UserLevels;