import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/eventsList.css';
import { jwtDecode } from 'jwt-decode';
import { GeneralContext } from '../App';


const EventsList = ({ setIsView, setEventID }) => {

    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    const url = 'http://localhost:7000';
    const { setLoading } = useContext(GeneralContext);


    const fetchEvents = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`${url}/events`);

            setEvents(response.data);

        } catch (error) {
            console.log('Error fetching questions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);



    const handleEventClick = (eventID) => {
        setIsView(true);
        setEventID(eventID);
    }

    const deleteEvent = async (eventID) => {
        try {
            await axios.delete(`${url}/events/${eventID}`);
            navigate(-1);
        } catch (error) {
            console.log('Error delete Event:', error);
        }
    }



    return (
        <div>
            <div className='grid'>
                <button onClick={() => navigate('/new-event')}>
                    Add new event
                </button>

                {events.map(
                    (event, index) => {
                        const eventDate = new Date(event.date);
                        const eventID = event._id;

                        return (
                            <div key={index} className='event'
                                onClick={() => handleEventClick(eventID)} >
                                <h2>{event.title}</h2>
                                <p>Date: {eventDate.toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                }
                                )}</p>
                                <p>Time: {event.time}</p>
                                <p>Zoom Link: {event.zoomLink}</p>

                                {token &&
                                    decodedToken.isAdmin &&
                                    <>
                                        <button onClick={() =>
                                            navigate('/edit-event', { state: { eventID } })}
                                        >Edit</button>

                                        <button onClick={() => deleteEvent(eventID)}>Delete</button>
                                    </>
                                }
                            </div>
                        )
                    }

                )}
            </div>
        </div >
    )
}

export default EventsList
