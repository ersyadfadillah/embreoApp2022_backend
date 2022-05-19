import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Proposals = db.define('Proposals', {
    event_name:{
        type: DataTypes.STRING
    },
    company:{
        type: DataTypes.STRING
    },
    event_date:{
        type: DataTypes.DATE
    },
    event_date2:{
        type: DataTypes.DATE
    },
    event_date3:{
        type: DataTypes.DATE
    },
    event_location:{
        type: DataTypes.STRING
    },
    status:{
        type: DataTypes.INTEGER
    },
    event_date_deal:{
        type: DataTypes.DATE
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

export default Proposals;