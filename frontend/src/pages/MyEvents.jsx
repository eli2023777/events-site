import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { GeneralContext } from '../App';



const MyEvents = () => {

    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    const { API, setLoading, isDark } = useContext(GeneralContext);



    const fetchEvents = async () => {
        if (token) {

            setLoading(true);

            try {
                const response = await axios.get(`${API}/events/my-events`, {
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
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);


    const handleEventClick = (eventID) => {
        navigate(`/view-event`, { state: { eventID } });
    }


    const editEvent = (e, eventID) => {
        e.stopPropagation();
        navigate('/edit-event', { state: { eventID } })
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
                alert('Event successfully deleted');
                setEvents(prevEvents => prevEvents.filter(event => event._id !== eventID));
            } catch (error) {
                console.log('Error delete Event:', error);
            }

        } else {
            return; // If the user is not confirmed
        }
    };

    return (
        <div>
            <div className={isDark ? 'darkFrame' : 'lightFrame'}>

                <h1>My Events</h1>
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
                                    <p>Date: {eventDate.toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    }
                                    )}</p>
                                    <p>Time: {event.time}</p>
                                    <p>Zoom Link: {event.zoomLink}</p>

                                    {decodedToken.isBusiness &&
                                        decodedToken._id === event.user_id &&
                                        <>
                                            <button onClick={(e) => editEvent(e, eventID)}
                                            >Edit
                                            </button>

                                            <button onClick={(e) => deleteEvent(e, eventID)}>
                                                Delete
                                            </button>
                                        </>
                                    }
                                </div>
                            )
                        }

                    )}

                </div >
            </div>
        </div>
    )

};

export default MyEvents;
