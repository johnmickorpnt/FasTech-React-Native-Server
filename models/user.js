import { Sequelize } from "sequelize";
import sequelize from "../utils/database.js";

const User = sequelize.define('registered_accounts', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    firstname:{
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull:false,
        unique: true,
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone:{
        type: Sequelize.BIGINT(11),
        allowNull: false
    }
});

export default User;