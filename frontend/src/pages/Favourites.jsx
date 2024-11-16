import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { GeneralContext } from '../App';
import { jwtDecode } from 'jwt-decode';

const Favourites = () => {

    const [events, setEvents] = useState([]);
    const { API, setLoading, isDark } = useContext(GeneralContext);
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;

    const fetchEvents = async () => {
        if (token) {

            setLoading(true);

            try {
                const response = await axios.get(`${API}/events/favourites`, {
                    headers: {
                        'x-auth-token': token
                    }
                });

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

    return (
        <div>
            <div className={isDark ? 'darkFrame' : 'lightFrame'}>
                <div className='grid'>

                    {events.map(
                        (event, index) => {
                            const eventDate = new Date(event.date);
                            // const eventID = event._id;


                            return (
                                <div key={index} className='event'
                                    style={{
                                        backgroundImage: `url(${event.image?.url})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        padding: '20px',
                                    }}
                                // onClick={() => handleEventClick(eventID)}
                                >
                                    <h2>{event.title}</h2>
                                    <p>Date: {eventDate.toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    }
                                    )}</p>
                                    <p>Time: {event.time}</p>
                                    <p>Zoom Link: {event.zoomLink}</p>

                                    {/* {decodedToken.isBusiness &&
                                    decodedToken._id === event.user_id &&
                                    <>
                                        <button onClick={(e) => editEvent(e, eventID)}
                                        >Edit
                                        </button>

                                        <button onClick={(e) => deleteEvent(e, eventID)}>
                                            Delete
                                        </button>
                                    </>
                                } */}
                                </div>
                            )


                        }
                    )}
                </div>

            </div>
        </div>
    )
}

export default Favourites
