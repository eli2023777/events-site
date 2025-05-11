import React, { useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { DualIcon } from '../helpers/DualIcon';
import Likes from '../helpers/Likes';
import { METHOD } from '../hooks/useAPI';
import useAPI from '../hooks/useAPI';
import { GeneralContext } from '../App';



const EventsList = ({ setIsView, setEventID }) => {

    const [events, setEvents] = useState([]);
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    const { apiData, setApiData, setLoading } = useContext(GeneralContext);
    const [isPatch, setIsPatch] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [hoveredEventID, setHoveredEventID] = useState(null);

    const [error, callAPI, payload, data] = useAPI();



    useEffect(() => {
        callAPI(METHOD.GET_ALL, 'events');
    }, []);




    useEffect(() => {
        if (apiData) {

            if (Array.isArray(apiData)) {// 1. Check if data is array of events - GET events case.
                setEvents(apiData);
            } else if (decodedToken?.isAdmin && !isPatch && isDelete) { // 2. DELETE event case.
                alert('Event succesfully deleted')
                setEvents(prevEvents => prevEvents.filter(event => event._id !== payload));
                setIsDelete(false);
            }

            // Reset apiData
            setApiData(null);
        }

    }, [apiData, payload]);


    useEffect(() => {
        setEvents(events);
    }, [events]);


    const handleEventClick = (eventID) => {
        setIsView(true);
        setEventID(eventID);
    }


    const deleteEvent = async (e, eventID) => {
        e.stopPropagation();

        if (window.confirm(`Are you sure you want to delete this event? 
            All his data will be gone.`)) {

            callAPI(METHOD.DELETE, 'events', eventID);
            setIsDelete(true);
        } else {
            return; // If the user is not confirmed
        }

    }


    return (
        <div>
            {data && data.length === 0 ? (
                <p>No events available</p>
            ) : (
                <>
                    <br />
                    <h2>Events list</h2>
                    <br />

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


                                                {token &&
                                                    decodedToken.isAdmin &&
                                                    <button onClick={(e) => deleteEvent(e, eventID)}>
                                                        <DualIcon iconName="trash" />
                                                    </button>
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

                    </div>
                </>
            )
            }
        </div >
    )
}

export default EventsList


