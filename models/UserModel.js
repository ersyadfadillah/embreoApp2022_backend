import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Users = db.define('Users', {
    nama:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.DOUBLE
    },
    user_level:{
        type: DataTypes.DOUBLE
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
},
{
    freezeTableName: true
});

export default Users;