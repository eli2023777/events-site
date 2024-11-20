import { User } from "./users.model.mjs";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserLogin } from './users.joi.mjs';
import { Router } from 'express';
import dotenv from 'dotenv';

dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const router = Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    const validate = UserLogin.validate({ email, password });

    if (validate.error) {
        return res.status(403).send(validate.error.details[0].message);
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(403).send('Invalid email or password');
    }

    if (!user.password || !await bcrypt.compare(password, user.password)) {
        return res.status(403).send('Invalid email or password');
    }

    const token = jwt.sign({
        _id: user._id,
        isBusiness: user.isBusiness,
        isAdmin: user.isAdmin,
    }, JWT_SECRET, { expiresIn: '1h' });

    console.log(user);


    res.send(token);
});


export default router;

