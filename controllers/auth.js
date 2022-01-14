import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

import Sequelize from 'sequelize';

import User from '../models/user.js';
import Appointment from '../models/appointment.js';

const Op = Sequelize.Op;
var user;
const register = (req, res, next) => {
    console.log(req.body);
    console.log(req.body.firstname)
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(dbUser => {
            if (dbUser) {
                return res.status(409).json({ message: "Email already exists" })
            }
            else if (req.body.email && req.body.password) {
                console.log(res.body);
                bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
                    if (err) {
                        return res.status(500).json({ message: "Can't hash password" });
                    }
                    else if (passwordHash) {
                        return User.create({
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            email: req.body.email,
                            password: passwordHash,
                            phone: req.body.phone
                        })
                            .then(() => {
                                res.status(200).json({ message: "user created" });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(502).json({ message: "error while creating the user" });
                            });
                    }
                })
            }
            else if (!req.body.firstname) {
                return res.status(400).json({ message: "First name not provided" });
            }
            else if (!req.body.lastname) {
                return res.status(400).json({ message: "Last name not provided" });
            }
            else if (!req.body.password) {
                return res.status(400).json({ message: "password not provided" });
            }
            else if (!req.body.email) {
                return res.status(400).json({ message: "email not provided" });
            }
        });
};

const login = (req, res, next) => {
    const email = req.body.email;
    const phone = req.body.phone;
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUser=>{
        if(!dbUser){
            res.status(404).json({message:"User email is not registered"});
        }
        else{
            bcrypt.compare(req.body.password, dbUser.password, (err,compareRes) =>{
                if (err) { // error while comparing
                    res.status(502).json({message: "error while checking user password"});
                } else if (compareRes) { // password match
                    const token = jwt.sign({ email: req.body.email }, 'secret', { expiresIn: '1h' });
                    res.status(200).json({message: "user logged in", "token": token});
                    user = email;
                } else { // password doesnt match
                    res.status(401).json({message: "Invalid Credentials"});
                };
            });
        }
    });
};

const isAuth = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: 'Not Authenticated' });
    };
    const token = authHeader.split(' ')[1];
    let decodedToken; 
    try {
        decodedToken = jwt.verify(token, 'secret');
    } catch (err) {
        return res.status(500).json({ message: err.message || 'could not decode the token' });
    };
    if (!decodedToken) {
        res.status(401).json({ message: 'Unauthorized access.' });
    } else {
        User.findOne({
            where: {
                email:user
            }
        }).then(dbUser => {
            res.status(200).json({ message: 'Logged in Successfully.', user: dbUser });
        })
        
    };
};
export { register, login, isAuth };

