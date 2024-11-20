import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { GeneralContext } from '../App';
import useAPI from '../hooks/useAPI';
import { METHOD } from '../hooks/useAPI';
import { DualIcon } from '../helpers/DualIcon';
import Likes from '../helpers/Likes';


const MyEvents = () => {

    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    const { setLoading, isDark } = useContext(GeneralContext);
    const [isHoveredIcon, setIsHoveredIcon] = useState(false);
    const [hoveredEventID, setHoveredEventID] = useState(null);
    const [isPatch, setIsPatch] = useState(false);

    const [error, callAPI, payload, data] = useAPI();


    useEffect(() => {
        if (token)
            callAPI(METHOD.GET_MY_EVENTS, 'events');

    }, []);

    // Update 'myEvents' after patch likes
    useEffect(() => {
        if (token)
            callAPI(METHOD.GET_MY_EVENTS, 'events');
    }, [isPatch]);


    useEffect(() => {
        if (data)
            if (Array.isArray(data)) {
                setEvents(data);
            } else {
                alert('Event successfully deleted');
                setEvents(prevEvents => prevEvents.filter(event => event._id !== data._id));
            }
    }, [data]);


    const handleEventClick = (eventID) => {
        navigate(`/view-event`, { state: { eventID } });
    }


    const editEvent = (e, eventID) => {
        e.stopPropagation();
        navigate('/edit-event', { state: { eventID } })
    }


    const deleteEvent = async (e, eventID) => {
        e.stopPropagation();

        if (window.confirm(`Are you sure you want to delete this Event? 
            All his data will be gone.`)) {
            callAPI(METHOD.DELETE, 'events', eventID);
        } else {
            return;
        };

    };

    return (
        <div>
            <div className={isDark ? 'darkFrame' : 'lightFrame'}>

                <h1>My Events</h1>


                {/* Add new event */}
                {decodedToken && decodedToken.isBusiness &&
                    <button
                        className='plusIcon'
                        style={{
                            ...(isHoveredIcon && { transform: 'scale(1.2)' })
                        }}
                        onMouseEnter={() => setIsHoveredIcon(true)}
                        onMouseLeave={() => setIsHoveredIcon(false)}
                        onClick={() => navigate('/new-event')}>
                        <DualIcon iconName="plus" />
                    </button>
                }

                <div className='grid'>


                    {events.map(
                        (event, index) => {
                            const eventDate = new Date(event.date);
                            const eventID = event._id;
                            const isLiked = event.likes?.includes(decodedToken?._id);

                            return (


                                <div key={index}
                                    className={hoveredEventID ? 'hoveredEvent' : 'event'}
                                    style={{
                                        ...(hoveredEventID !== eventID && {
                                            backgroundImage: `url(${event.image?.url})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        })
                                    }}
                                    onMouseEnter={() => setHoveredEventID(eventID)}
                                    onMouseLeave={() => setHoveredEventID(null)}
                                    onClick={() => handleEventClick(eventID)} >

                                    <h2 className='title'>{event.title}</h2>

                                    {hoveredEventID === eventID &&
                                        <>
                                            <p>{eventDate.toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            }
                                            )}</p>

                                            <p>{event.time}</p>
                                            <p>{event.location}</p>



                                            {decodedToken.isBusiness &&
                                                decodedToken._id === event.user_id &&
                                                <>
                                                    <button onClick={(e) => editEvent(e, eventID)}   >
                                                        <DualIcon iconName="edit" />
                                                    </button>

                                                    <button onClick={(e) => deleteEvent(e, eventID)}>
                                                        <DualIcon iconName="trash" />
                                                    </button>
                                                </>
                                            }
                                        </>
                                    }


                                    <div className='like'        >
                                        <Likes
                                            event={event}
                                            setEvents={setEvents}
                                            isLiked={isLiked}
                                            setIsPatch={setIsPatch}
                                        /></div>
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
