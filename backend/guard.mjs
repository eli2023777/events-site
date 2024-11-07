import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET;



// Guard middleware to check if the user is logged in
export const isAuthenticated = (req, res, next) => {

    const token = req.headers['x-auth-token'];
    console.log('Received token:', token);

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
    // const userReq = jwt.decode(token);
    if (req.user._id === req.params.id) {
        return next();
    } else {
        return res.status(403).send('Access denied');
    }
};


export const isSameUserOrAdmin = (req, res, next) => {
    // const userReq = jwt.decode(token);
    if (req.user._id === req.params.id || req.user.isAdmin) {
        return next();
    } else {
        return res.status(403).send('Access denied');
    }
};


// Guard middleware to check if the user is admin
export const isAdmin = (req, res, next) => {
    // const user = jwt.verify(token, JWT_SECRET);

    if (!req.user.isAdmin) {
        res.status(403).send('Unauthorized');
    } else {
        next();
    }

}

// Guard middleware to check if the user is business user

export const isBusinessUser = (req, res, next) => {
    // const user = jwt.verify(token, JWT_SECRET);

    if (!req.user.isBusiness) {
        res.status(403).send('Unauthorized');
    } else {
        next();
    }

}
