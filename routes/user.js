import express from 'express';
import {Sequelize} from 'sequelize';
import sequelize from '../utils/database.js';
import {register, login, isAuth} from '../controllers/auth.js';

const userRoutes = express.Router();

userRoutes.post("/register", register);

userRoutes.post("/login", login);

userRoutes.get("/private", isAuth);

export default userRoutes;