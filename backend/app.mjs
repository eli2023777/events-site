import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import morgan from 'morgan';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';

import { User } from './users/users.model.mjs';
import { Event } from './events/events.model.mjs';

import eventRoutes from './events/events.routes.mjs';
import userRoutes from './users/users.routes.mjs';
import loginRoutes from './users/login.routes.mjs';



// Create initial Users
const createInitialUsers = async () => {
    const adminEmail = 'admin@10.com';
    const businessEmail = 'business@10.com';
    const regularEmail = 'regular@10.com';

    const existingAdmin = await User.findOne({ email: adminEmail });
    const existingBusiness = await User.findOne({ email: businessEmail });
    const existingRegular = await User.findOne({ email: regularEmail });

    if (!existingAdmin) {
        const admin = new User({
            name: { first: 'Admin', last: 'User' },
            isAdmin: true,
            isBusiness: false,
            phone: '1234567890',
            email: adminEmail,
            password: await bcrypt.hash('Admin123!', 10),
            address: {
                state: 'State',
                country: 'Country',
                city: 'City',
                street: 'Street',
                houseNumber: '1',
                zip: 123456
            },
            image: { url: '', alt: '' }
        });
        await admin.save();
        console.log(chalk.green('Admin user created successfully.'));
    }

    if (!existingBusiness) {
        const business = new User({
            name: { first: 'Business', last: 'User' },
            isAdmin: false,
            isBusiness: true,
            phone: '1234567890',
            email: businessEmail,
            password: await bcrypt.hash('Business123!', 10),
            address: {
                state: 'State',
                country: 'Country',
                city: 'City',
                street: 'Street',
                houseNumber: '2',
                zip: 654321

            },
            image: { url: '', alt: '' }
        });
        await business.save();
        console.log(chalk.green('Business user created successfully.'));
    }

    if (!existingRegular) {
        const regular = new User({
            name: { first: 'Regular', last: 'User' },
            isAdmin: false,
            isBusiness: false,
            phone: '1234567890',
            email: regularEmail,
            password: await bcrypt.hash('Regular123!', 10),
            address: {
                state: 'State',
                country: 'Country',
                city: 'City',
                street: 'Street',
                houseNumber: '3',
                zip: 102030
            },
            image: {
                url: '',
                alt: ''
            }
        });
        await regular.save();
        console.log(chalk.green('Regular user created successfully.'));
    }
};

// Create initial Events
const createInitialEvents = async () => {



    const event1 = new Event({
        title: 'Tech Innovators Conference 2024',

        date: new Date('2024-11-20'),
        time: '09:30',
        location: 'Silicon Valley Convention Center',
        description: `Explore the latest advancements in technology with industry leaders and innovators. Keynote speakers include top CEOs and tech pioneers.`,
        image: {
            url: '',
            alt: '',
        },
    });

    await event1.save();

    const event2 = new Event({
        title: 'Summer Beach Party 2024',

        date: new Date('2024-12-05'),
        time: '16:00',
        location: 'Miami Beach, Florida',
        description: `Celebrate the summer with good vibes, live DJ music, and refreshing cocktails. Don't forget your swimsuit!`,
        image: {
            url: '',
            alt: '',
        },
    });
    await event2.save();

    const event3 = new Event({
        title: 'Annual Soccer Tournament',

        date: new Date('2024-10-22'),
        time: '10:00',
        location: 'National Stadium, Los Angeles',
        description: `Watch your favorite teams compete in this exciting annual soccer tournament. Cheer for the players and experience the thrill of the game!`,
        image: {
            url: '',
            alt: '',
        },
    });
    await event3.save();

    console.log('Events created successfully.');

};


// Main function to connect to MongoDB and create the admin user if necessary
const main = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/events')
            .then(() => console.log(chalk.blue(`Connected to MongoDB`)))
            .catch(err => console.error('Error connecting to MongoDB', err));

        await createInitialUsers();
        // await createInitialEvents();


    } catch (error) {
        console.error(chalk.red('Error connecting to MongoDB or creating initial data:', error));
    }
};

main().catch(console.error);

export const app = express();

app.use(morgan(':method :url :status :response-time ms - :date[iso]'));

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: 'Content-Type, Accept, x-auth-token',
}));


app.get('/', (req, res) => {
    res.send({
        message: 'Welcome to MongoDB!',
    });
});


// Define __dirname using __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/events', eventRoutes);
app.use('/users', userRoutes);
app.use('/login', loginRoutes);

// app.use((req, res) => {
//     const filePath = path.join(__dirname, 'public', req.path);
//     res.sendFile(filePath, (err) => {
//         if (err) {
//             res.status(404).send('The requested resource was not found on the server');
//         }
//     });
// });

app.listen(7000, () => {
    console.log('listening on port 7000');
});
