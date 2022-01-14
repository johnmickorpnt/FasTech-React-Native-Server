import express from 'express';
import {Sequelize} from 'sequelize';
import sequelize from '../utils/database.js';
import {createAppointment, myAppointments} from '../controllers/appointments.js';
import bodyParser from 'body-parser';

const appointmentRoutes = express.Router();

appointmentRoutes.post("/createAppointment", createAppointment);

appointmentRoutes.get("/myAppointments/:user", myAppointments);
export default appointmentRoutes;