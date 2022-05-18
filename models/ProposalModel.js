import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Proposal = db.define('Proposal', {
    event_name:{
        type: DataTypes.STRING
    },
    vendor_id:{
        type: DataTypes.DOUBLE
    },
    status:{
        type: DataTypes.INTEGER
    },
    komen:{
        type: DataTypes.TEXT
    },
    created_by:{
        type: DataTypes.DOUBLE
    },
    update_by:{
        type: DataTypes.DOUBLE
    },
},
{
    freezeTableName: true
});

export default Proposal;