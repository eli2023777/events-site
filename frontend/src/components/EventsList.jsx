import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { GeneralContext } from '../App';
import { DualIcon } from '../helpers/DualIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faHeartSolid, faHeartRegular);

const EventsList = ({ setIsView, setEventID }) => {

    const [events, setEvents] = useState([]);
    const [likes, setLikes] = useState(() => {
        // Load likes from localStorage or initialize as empty object
        const savedLikes = localStorage.getItem('likes');
        return savedLikes ? JSON.parse(savedLikes) : {};
    });
    const [hoveredEventID, setHoveredEventID] = useState(false)
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

        // // fetch events Eevery 10 seconds for Update events (when add or delete)
        // const interval = setInterval(() => {
        //     fetchEvents();
        // }, 10000);

        // Clear interval 
        // return () => clearInterval(interval);
    }, []);


    const handleEventClick = (eventID) => {
        setIsView(true);
        setEventID(eventID);
    }

    const LikeEvent = async (e, eventID) => {
        e.stopPropagation();
        if (!token) {
            alert('You need to log-in or register to like events')
        } else {

            try {
                const response = await axios.patch(`${API}/events/${eventID}`,
                    {},
                    {
                        headers: {
                            'x-auth-token': token
                        }
                    });

                // setLikes((prevLikes) => {
                //     const updatedLikes = {
                //         ...prevLikes,
                //         [eventID]: !prevLikes[eventID], // Toggle like state
                //     };
                //     localStorage.setItem('likes', JSON.stringify(updatedLikes));
                //     return updatedLikes;
                // });

                // Update the events with the new likes count from the server
                setEvents(prevEvents =>
                    prevEvents.map(event =>
                        event._id === eventID
                            ? { ...event, likes: response.data.likes } // Update likes from server response
                            : event
                    )
                );

            } catch (error) {
                console.error('Error liking/unliking event:', error);
            }
        }
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
        setLikes(likes);
        setEvents(events);
    }, [events, likes]);


    return (
        <div>
            {decodedToken && decodedToken.isBusiness &&

                <button onClick={() => navigate('/new-event')}>
                    Add new event
                </button>
            }

            <div className='grid'>

                {events.map(
                    (event, index) => {
                        const eventDate = new Date(event.date);
                        const eventID = event._id;
                        // const isLiked = likes[eventID] || false; // Check if event is already liked
                        const isLiked = event.likes.includes(decodedToken?._id);



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
                                <p>{event.zoomLink}</p>

                                <div
                                    onMouseEnter={() => setHoveredEventID(eventID)}
                                    onMouseLeave={() => setHoveredEventID(null)}
                                    onClick={(e) => LikeEvent(e, eventID)}>
                                    {event.likes.length}{<FontAwesomeIcon
                                        icon={(isLiked || hoveredEventID === eventID) ?
                                            faHeartSolid : faHeartRegular} />
                                    }
                                </div>

                                {token &&
                                    decodedToken.isAdmin &&
                                    <button onClick={(e) => deleteEvent(e, eventID)}>
                                        <DualIcon iconName="trash" />
                                    </button>
                                }

                            </div>
                        )
                    }

                )}
            </div>
        </div>
    )
}

export default EventsList
