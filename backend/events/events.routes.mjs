import { Router } from 'express';
import { Event } from './events.model.mjs';
import { isAuthenticated, isSameUser, isSameUserOrAdmin, isAdmin, isBusinessUser } from "../guard.mjs";
import jwt from "jsonwebtoken";


export const router = Router();


// Get All events
router.get('/', async (req, res) => {
    res.send(await Event.find());
});


// My Events (get events by user)
// router.get('/my-events', isAuthenticated, isBusinessUser, async (req, res) => {
//     const user = jwt.decode(req.headers['x-auth-token']);

//     const events = await Event.find({ user_id: user._id });
//     console.log(events);


//     res.send(events);
// });

router.get('/my-events', isAuthenticated, isBusinessUser, async (req, res) => {
    const events = await Event.find({ user_id: req.user._id });
    console.log(events);
    res.send(events);
})

// Get events By Date
router.get('/by-date', async (req, res) => {
    try {
        const { date } = req.query;
        const events = await Event.find();
        const eventsByDate = events
            .filter(event => event.date)
            .filter(event => event.date.toISOString().split('T')[0] === date);

        res.send(eventsByDate);
    } catch (error) {
        return res.status(404).send('Events not found');
    }
});


// Get One event
router.get('/:id', async (req, res) => {
    const event = await Event.findById(req.params.id);

    if (!event)
        return res.status(404).send('Event not found');

    res.send(event);
});



// Add new event
router.post('/', isAuthenticated, isBusinessUser, async (req, res) => {
    const { title, date, time, location, zoomLink, url, alt } = req.body;

    const existingEvent = await Event.findOne({ title });
    if (existingEvent) {
        return res.status(400).send('Event with this title already exists');
    }

    const user = jwt.decode(req.headers['x-auth-token']);

    if (!user) {
        return res.status(401).send('Access denied. No token provided.');
    }

    const event = new Event({
        title: req.body.title,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        zoomLink: req.body.zoomLink,
        image: {
            url: req.body.url,
            alt: req.body.alt,
        },
        user_id: user._id
    });

    console.log(event);


    const newEvent = await event.save();
    console.log(newEvent);


    res.send(newEvent);
});


// Edit event
router.put('/:id', isAuthenticated, isSameUser, isBusinessUser, async (req, res) => {
    const { title, date, time, zoomLink } = req.body;

    const event = await Event.findById(req.params.id);
    if (!event)
        return res.status(404).send('Event not found');

    event.title = title || event.title;
    event.date = date || event.date;
    event.time = time || event.time;
    event.zoomLink = zoomLink || event.zoomLink;
    event.location = req.body.location || event.location;

    await event.save();

    res.send(event);
});


// Delete event
router.delete('/:id', isAuthenticated, isSameUserOrAdmin, async (req, res) => {
    const event = await Event.findByIdAndDelete(req.params.id);

    res.send(event);
});


export default router;
