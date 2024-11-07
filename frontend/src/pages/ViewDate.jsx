import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


const ViewDate = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { date } = location.state || {};
    const [events, setEvents] = useState([]);


    const url = `http://localhost:7000/events/by-date?date=${date}`;


    const getEvents = async () => {
        try {
            const response = await axios.get(url);
            setEvents(response.data);
            console.log(response.data);


        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (date)
            getEvents();
    }, [date]);


    const handleEventClick = (eventID) => {
        navigate(`/view-event`, { state: { eventID } })
    };


    return (
        <div>
            <h2>{(new Date(date)).toLocaleDateString('en-GB')}</h2>
            <button onClick={() => navigate('/')}>Back to Events</button>
            <button onClick={() => navigate('/new-event', { state: { date } })}>Add new Event</button>

            {
                events.length > 0 &&
                events.map(event => (
                    <div key={event._id}
                        onClick={() => handleEventClick(event._id)}>
                        <h3>{event.title}</h3>
                        <p>Date: {new Date(event.date).toLocaleDateString('en-GB')}</p>
                        <p>Time: {event.time}</p>
                        <p>Zoom Link: {event.zoomLink}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default ViewDate


