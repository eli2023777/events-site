import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Event } from './events/events.model.mjs';

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET;



// Guard middleware to check if the user is logged in
export const isAuthenticated = (req, res, next) => {

    const token = req.headers['x-auth-token'];

    if (!token) {
        return res.status(401).send('No token provided');
    }

    jwt.verify(token, JWT_SECRET, (err, data) => {
        if (err) {

            res.status(401).send('User not logged in');

        } else {
            req.user = data; // Save the token for aother middlewares

            next();
        }
    });
}


export const isSameUser = (req, res, next) => {
    if (req.user._id === req.params.id) {
        return next();
    } else {
        return res.status(403).send('Access denied');
    }
};


export const isSameUserOrAdmin = (req, res, next) => {
    if (req.user._id === req.params.id || req.user._id === req.params.id || req.user.isAdmin) {
        return next();
    } else {
        return res.status(403).send('Access denied');
    }
};


export const isSameUserForEvents = async (req, res, next) => {

    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).send('Event not found');
        }

        if (event.user_id.toString() === req.user._id.toString()) {
            return next();
        }

        return res.status(403).send('Access denied');
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};



export const isSameUserOrAdminForEvents = async (req, res, next) => {

    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).send('Event not found');
        }

        if (req.user.isAdmin || event.user_id.toString() === req.user._id.toString()) {
            return next();
        }

        return res.status(403).send('Access denied');
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};



// Guard middleware to check if the user is admin
export const isAdmin = (req, res, next) => {

    if (!req.user.isAdmin) {
        res.status(403).send('Unauthorized');
    } else {
        next();
    }

}

// Guard middleware to check if the user is business user

export const isBusinessUser = (req, res, next) => {

    if (!req.user.isBusiness) {
        res.status(403).send('Unauthorized');
    } else {
        next();
    }

}
