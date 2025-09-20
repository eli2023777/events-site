import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GeneralContext } from '../App';
import { jwtDecode } from 'jwt-decode';
import useAPI from '../hooks/useAPI';
import { METHOD } from '../hooks/useAPI';
import { DualIcon } from '../helpers/DualIcon';
import Likes from '../helpers/Likes';




const ViewDate = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { date } = location.state || {};
    const [events, setEvents] = useState([]);
    const { setLoading } = useContext(GeneralContext);

    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;

    const { isDark } = useContext(GeneralContext);

    const [isHoveredIcon, setIsHoveredIcon] = useState(false);
    const [hoveredEventID, setHoveredEventID] = useState(null);
    const [isPatch, setIsPatch] = useState(false);


    const [error, callAPI, payload, data] = useAPI();


    useEffect(() => {
        callAPI(METHOD.GET_ALL, `events/by-date?date=${date}`);
    }, []);


    useEffect(() => {
        if (data)
            setEvents(data);
    }, [data]);


    // Update events after pach likes
    useEffect(() => {
        if (token)
            callAPI(METHOD.GET_ALL, `events/by-date?date=${date}`);
    }, [isPatch]);


    const handleEventClick = (eventID) => {
        navigate(`/view-event`, { state: { eventID } })
    };


    return (
        <div>
            <h2>{(new Date(date)).toLocaleDateString('en-GB')}</h2>

            <div className={isDark ? 'darkFrame' : 'lightFrame'}>


                <button onClick={() => navigate(-1)}>
                    <DualIcon iconName="backward" />
                </button>


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

                    {
                        events.length > 0 &&


                        events.map(
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

                                        <h2 className={isDark ? 'title' : 'darkTitle'}>{event.title}</h2>


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
                            })
                    }

                </div>
            </div>
        </div>
    )
};

export default ViewDate;



