import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { GeneralContext } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DualIcon } from '../helpers/DualIcon';


const EventsList = ({ setIsView, setEventID }) => {

    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    const { API, setLoading } = useContext(GeneralContext);



    const fetchEvents = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`${API}/events`);

            setEvents(response.data);

        } catch (error) {
            console.log('Error fetching questions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch events First time
        fetchEvents();

        // fetch events Eevery 10 seconds for Update events (when add or delete)
        const interval = setInterval(() => {
            fetchEvents();
        }, 10000);

        // Clear interval 
        return () => clearInterval(interval);
    }, []);



    const handleEventClick = (eventID) => {
        setIsView(true);
        setEventID(eventID);
    }

    const deleteEvent = async (e, eventID) => {
        e.stopPropagation();

        if (window.confirm(`Are you sure you want to delete this event?`)) {

            try {
                await axios.delete(`${API}/events/${eventID}`,
                    {
                        headers: {
                            'x-auth-token': token
                        }
                    });
                setEvents(prevEvents => prevEvents.filter(event => event._id !== eventID));


            } catch (error) {
                console.log('Error delete Event:', error);
            }

        } else {
            return; // If the user is not confirmed
        }

    }

    useEffect(() => {
        setEvents(events);
    }, [events]);


    return (
        <div>
            {decodedToken && (decodedToken.isAdmin || decodedToken.isBusiness) &&

                <button onClick={() => navigate('/new-event')}>
                    Add new event
                </button>
            }

            <div className='grid'>

                {events.map(
                    (event, index) => {
                        const eventDate = new Date(event.date);
                        const eventID = event._id;

                        return (
                            <div key={index} className='event'
                                style={{
                                    backgroundImage: `url(${event.image?.url})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    padding: '20px',
                                }}
                                onClick={() => handleEventClick(eventID)} >
                                <h2>{event.title}</h2>
                                <p>{eventDate.toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                }
                                )}</p>
                                <p>{event.time}</p>
                                <p>{event.location}</p>

                                {token &&
                                    (decodedToken.isBusiness && decodedToken._id === event.user_id) &&
                                    <>
                                        <button onClick={() => navigate('/edit-event', { state: { eventID } })}>
                                            <DualIcon iconName="edit" />
                                        </button>
                                    </>
                                }


                                {token &&
                                    ((decodedToken.isBusiness && decodedToken._id === event.user_id)
                                        || decodedToken.isAdmin) &&
                                    <button onClick={(e) => deleteEvent(e, eventID)}            >
                                        <DualIcon iconName="trash" />
                                    </button>
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
