import { QueryInterface, Sequelize } from "sequelize";
import sequelize from "../utils/database.js";
import User from "./user.js";

const Appointment = sequelize.define("appointments", {
    apt_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.BIGINT(11),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    service: {
        type: Sequelize.ENUM,
        values: [
            "Hardware and Software Repair and Installation",
            "Data Recovery and Backup Services",
            "Virus and Malware Removal",
            "Troubleshooting and Networking Installation",
            "Maitenance Service System Setup and Configuration"
        ]
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    time: {
        type: Sequelize.STRING,
        allowNull: false
    },
    issue: {
        type: Sequelize.STRING,
        allowNull: true
    },
    ticket: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM,
        values: [
            "payment",
            "pending",
            "sevicing",
            "complete",
            "declined",
            "cancelled"],
        allowNull: false
    }
    
});

Appointment.belongsTo(User,{foreignKey:"requestee", targetKey: "id"});

export default Appointment;