import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

import User from '../models/user.js';
import Appointment from '../models/appointment.js';

const createAppointment = (req, res, next) => {
    console.log(req.body.service);
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
                id: req.body.user
            }
        }).then(dbUser => {
            if (dbUser) {
                try {
                    Appointment.create({
                        name: req.body.name,
                        phone: req.body.phone,
                        email: req.body.email,
                        service: req.body.service.trim(),
                        address: req.body.address,
                        date: req.body.date,
                        time: req.body.time,
                        issue: req.body.issue,
                        ticket: req.body.ticket,
                        status: "pending",
                        requestee: dbUser.id
                    })
                } catch (error) {
                    console.log(error);
                }
                res.status(200).json({ message: 'Appointment Created.' });
            }
            else {
                res.status(200).json({ message: 'Cannot create appointment.' });
            }
        })
    };
};

const myAppointments = (req, res, next) => {
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
        try {
            Appointment.findAll({
                where: {
                    requestee: req.params.user
                },
                raw: true
            }).then(dbUser => {
                res.status(200).json(dbUser);
            });
        } catch (error) {
            res.status(500).json({"Error": error})
        }
    }
    
};

export { createAppointment, myAppointments };