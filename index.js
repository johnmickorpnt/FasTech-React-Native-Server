import express from "express";

import sequelize from './utils/database.js';

import userRoute from './routes/user.js';
import appointmentRoutes from "./routes/appointment.js";


import bodyParser from "body-parser";


const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.json());

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});



sequelize.sync();

app.listen(port, () => {
    console.log(`Server is active on ${port}`);
});

app.use(userRoute);

app.use(appointmentRoutes);