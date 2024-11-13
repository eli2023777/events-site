import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GeneralContext } from '../App';


const NewEvent = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const { date } = location.state || '';
    const [newDate, setNewDate] = useState(date)
    const [newEvent, setNewEvent] = useState({ date });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { API, setLoading } = useContext(GeneralContext);

    const token = localStorage.getItem('token');


    const handleChange = (e) => {
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    }

    const handleChangeDate = (e) => {
        setNewDate(e.target.value);
        setNewEvent({ ...newEvent, date: e.target.value });
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
    }

    const postNewEvent = async () => {

        try {
            const response = await axios.post(`${API}/events`,
                {
                    title: newEvent.title,
                    date: newEvent.date,
                    time: newEvent.time,
                    location: newEvent.location,
                    zoomLink: newEvent.zoomLink,
                    url: newEvent.url,
                    alt: newEvent.title
                },
                {
                    headers: {
                        'x-auth-token': token
                    }
                }
            );

            setNewEvent(response.data);
            console.log(newEvent);


        } catch (error) {
            console.log('Error posting events:', error);
        }
    };

    useEffect(() => {
        if (isSubmitted)
            postNewEvent();
    }, [isSubmitted]);




    return (
        <div>

            <button onClick={() => navigate('/')}>Home</button>

            <h1>New Event</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" required
                    onChange={handleChange} />

                <label htmlFor="date">Date:</label>
                <input type="date" id="date" name="date" required
                    onChange={handleChangeDate}
                    value={newDate}
                />

                <label htmlFor="time">Time:</label>
                <input type="time" id="time" name="time" required
                    onChange={handleChange} />

                <label htmlFor="time">Location:</label>
                <input type="text" id="location" name="location"
                    onChange={handleChange} />

                <label htmlFor="zoomLink">Zoom Link:</label>
                <input type="text" id="zoomLink" name="zoomLink"
                    onChange={handleChange} />

                <label htmlFor="url">Image URL:</label>
                <input type="text" id="url" name="url" required
                    onChange={handleChange} />



                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewEvent
