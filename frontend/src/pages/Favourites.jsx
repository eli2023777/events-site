import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { GeneralContext } from '../App';
import { jwtDecode } from 'jwt-decode';
import useAPI from '../hooks/useAPI';
import { METHOD } from '../hooks/useAPI';
import Likes from '../helpers/Likes';
import { useNavigate } from 'react-router-dom';


const Favourites = () => {

    const navigate = useNavigate();

    const [events, setEvents] = useState([]);
    const { setLoading, isDark } = useContext(GeneralContext);
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    const [isPatch, setIsPatch] = useState(false);
    const [hoveredEventID, setHoveredEventID] = useState(null);

    const [error, callAPI, payload, data] = useAPI();



    const handleEventClick = (eventID) => {
        navigate(`/view-event`, { state: { eventID } });
    }


    useEffect(() => {
        if (token)
            callAPI(METHOD.GET_ALL, 'events/favourites');
    }, []);


    useEffect(() => {
        if ((data && data.length > 0)) {
            setEvents(data);
        }
    }, [data, events]);


    // Update Favourites events after pach likes
    useEffect(() => {
        if (token)
            callAPI(METHOD.GET_ALL, 'events/favourites');
    }, [isPatch]);




    return (
        <div>
            <div className={isDark ? 'darkFrame' : 'lightFrame'}>

                <div>{(!data || (data && !data.length > 0)) && (
                    <div className='noData'>There are no favorite events here yet,
                        events you liked will be displayed here</div>
                )}</div>

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

                                            <div className='like'        >
                                                <Likes
                                                    event={event}
                                                    setEvents={setEvents}
                                                    isLiked={isLiked}
                                                    setIsPatch={setIsPatch}
                                                /></div>

                                        </>
                                    }

                                    {/* <div key={index} className='event'
                                    style={{
                                        backgroundImage: `url(${event.image?.url})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        padding: '20px',
                                    }}
\                                >
                                    <h2>{event.title}</h2>
                                    <p>Date: {eventDate.toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    }
                                    )}</p>
                                    <p>{event.time}</p>
                                    <p>{event.location}</p>

                                    <div><Likes
                                        event={event}
                                        setEvents={setEvents}
                                        isLiked={isLiked}
                                        setIsPatch={setIsPatch}
                                    /></div> */}


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

            </div >

        </div >
    )
}

export default Favourites
