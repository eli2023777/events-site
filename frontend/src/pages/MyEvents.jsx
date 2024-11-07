import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { GeneralContext } from '../App';


const MyEvents = () => {

    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const url = 'http://localhost:7000';
    const { setLoading } = useContext(GeneralContext);


    const fetchEvents = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`${url}/events/my-events`, {
                headers: {
                    'x-auth-token': token
                }
            }

            );

            setEvents(response.data);

        } catch (error) {
            console.log('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);


    const handleEventClick = (eventID) => {
        navigate(`/view-event`, { state: { eventID } });
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
            <h1>My Events</h1>
            <div>
                <button onClick={() => navigate('/new-event')}>
                    Add new event
                </button>


                {events.map(
                    (event, index) => {
                        const eventDate = new Date(event.date);
                        const eventID = event._id;
                        console.log('event:', event);


                        return (
                            <div key={index} className='event'
                                style={{
                                    backgroundImage: `url(${event.image?.url})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    padding: '20px',
                                }}
                                // backgroundImage={event.image.url}
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

                                {decodedToken.isAdmin &&
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

            </div >

        </div>
    )
}

export default MyEvents
