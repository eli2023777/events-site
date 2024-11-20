import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { GeneralContext } from '../../App';
import '../../css/viewEvent.css';
import { DualIcon } from '../../helpers/DualIcon';
import useAPI from '../../hooks/useAPI';
import { METHOD } from '../../hooks/useAPI';
import { UI_STATE } from '../../helpers/uiStateObj';



const ViewEvent = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const isDark = localStorage.getItem('isDark');
    const { setLoading } = useContext(GeneralContext);

    const [event, setEvent] = useState({});
    const { eventID, uiState } = location.state || {};

    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;

    const [isDelete, setIsDelete] = useState(false);
    const [isNewData, setIsNewData] = useState({});


    // urlRegex to check if location is a URL for Zoom-link
    const urlRegex = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-./?%&=]*)?$/i;

    const [error, callAPI, payload, data] = useAPI();


    useEffect(() => {
        callAPI(METHOD.GET_ONE, 'events', eventID);
    }, []);

    useEffect(() => {
        if (isNewData) {
            setEvent(isNewData); // Get event

            if (isDelete) { // delete event
                alert('Event succesfully deleted')
                navigate('/', {
                    state:
                        uiState === UI_STATE.EVENTS ? true : undefined
                })
            }
        }

        // Reset data
        setIsNewData(null);
    }, [isNewData]);


    // set 'data' to 'newData' state, for not geting the same data for GET and DELETE methods.
    useEffect(() => {
        if (data) {
            setIsNewData(data);
        }
    }, [data]);




    const deleteEvent = async () => {
        if (window.confirm(`Are you sure you want to delete this Event? 
            All his data will be gone.`)) {
            callAPI(METHOD.DELETE, 'events', eventID);
            setIsDelete(true);
        } else {
            return;
        };
    };



    return (
        <div>
            <div className={isDark ? 'darkFrame' : 'lightFrame'}>

                <div>
                    <button
                        onClick={() => {
                            navigate('/', {
                                state:
                                    uiState === UI_STATE.EVENTS ? true : undefined
                            })
                        }}>
                        <DualIcon iconName="backward" />
                    </button>
                </div>
                <br />
                {
                    event && (
                        <>

                            <div className='flex'>

                                <section className='text'>
                                    <div className='topText'>
                                        <p>{new Date(event.date).toLocaleDateString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                        }
                                        )}</p>
                                        <h1>{event.title}</h1>
                                    </div>

                                    <div>
                                        <h3>When?</h3>
                                        <p>{new Date(event.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        }
                                        )}</p>
                                        <p>{event.time}</p>
                                    </div>
                                    <h3>Where?</h3>

                                    {/* Check if location is a URL for Zoom-link */}
                                    {urlRegex.test(event.location) ? (
                                        <p>
                                            <a href={event.location}
                                                target="_blank" rel="noopener noreferrer">
                                                {event.location}</a>
                                        </p>
                                    ) : (
                                        <p>{event.location}</p>
                                    )

                                    }


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
                                        <button onClick={deleteEvent}>
                                            <DualIcon iconName="trash" />
                                        </button>
                                    }
                                </section>

                                <div className='gallery'
                                >
                                    <img src={event.image?.url} alt={event.image?.alt} className="eventImage" />

                                </div>


                            </div>

                            <div>{event.description}</div>

                        </>
                    )
                }
            </div>
        </div >
    )
};

export default ViewEvent;
