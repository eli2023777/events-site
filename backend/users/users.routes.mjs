import { Router } from 'express';
import { User } from "./users.model.mjs";
import { isAuthenticated, isSameUser, isSameUserOrAdmin, isAdmin } from "../guard.mjs";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { UserRegisterOrEdit } from './users.joi.mjs';



export const router = Router();


// Add new user
router.post('/', async (req, res) => {
    const { first, last, phone, email, password, url, alt,
        state, country, city, street, houseNumber, zip } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).send('User with this email already exists');
    }

    const user = new User({
        name: {
            first: req.body.first,
            last: req.body.last
        },

        isBusiness: req.body.isBusiness,

        phone: req.body.phone,
        email: req.body.email,
        password: await bcrypt.hash(password, 10),
        address: {
            state: req.body.state,
            country: req.body.country,
            city: req.body.city,
            street: req.body.street,
            houseNumber: req.body.houseNumber,
            zip: req.body.zip,
        },
        image: {
            url: req.body.url,
            alt: req.body.alt
        },
    });

    const newUser = await user.save();

    res.send(newUser);
});


// Get all
router.get('/', isAuthenticated, isAdmin, async (req, res) => {
    try {
        res.send(await User.find());
    } catch (err) {
        res.status(500).send(err.message);
    }
});


// Get one
router.get('/:id', isAuthenticated, isSameUserOrAdmin, async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user)
        return res.status(404).send('User not found');

    res.send(user);
});


// Edit user
router.put('/:id', isAuthenticated, isSameUserOrAdmin, async (req, res) => {
    const { first, last, phone, email,
        state, country, city, street, houseNumber, url, alt } = req.body;


    console.log("Data received on server:", req.body);


    const validate = UserRegisterOrEdit.validate({ email });

    if (validate.error) {
        console.log("Validation error:", validate.error.details[0].message);

        return res.status(403).send(validate.error.details[0].message);
    }


    const user = await User.findById(req.params.id);
    if (!user)
        return res.status(404).send('User not found');

    user.name.first = first || user.name.first;
    user.name.last = last || user.name.last;

    user.phone = phone || user.phone;
    user.email = email || user.email;


    // if (password) {
    //     user.password = await bcrypt.hash(password, 10);
    // }

    user.address.state = state || user.address.state;
    user.address.country = country || user.address.country;
    user.address.city = city || user.address.city;
    user.address.street = street || user.address.street;
    user.address.houseNumber = houseNumber || user.address.houseNumber;

    user.image.url = url || user.image.url;
    user.image.alt = alt || user.image.alt;

    await user.save();

    console.log("Updated user in database:", user);

    res.send(user);
});



// Patch user's business status 
router.patch('/:id', isAuthenticated, isSameUser, async (req, res) => {

    const userReq = jwt.decode(req.headers.authorization);
    const user = await User.findById(req.params.id);

    if (!user)
        return res.status(404).send('User not found');
    else if (userReq._id === user._id.toString()) {
        user.isBusiness = !user.isBusiness;
        await user.save();
        res.send(user);
    }
});


// Delete user
router.delete('/:id', isAuthenticated, isSameUserOrAdmin, async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);

    res.send(user);
});

export default router;
