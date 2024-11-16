import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { GeneralContext } from '../App';
import '../css/viewEvent.css';
import { DualIcon } from '../helpers/DualIcon';




const ViewEvent = () => {
    const location = useLocation();
    const [event, setEvent] = useState({});
    const { eventID, uiState } = location.state || {};
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    const { API, setLoading } = useContext(GeneralContext);
    const isDark = localStorage.getItem('isDark');



    const getEvent = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`${API}/events/${eventID}`);
            setEvent(response.data);


        } catch (error) {
            console.log('Error get Event:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        getEvent();
    }, []);

    const deleteEvent = async () => {
        if (token) {
            try {
                await axios.delete(`${API}/events/${eventID}`,
                    {
                        headers: {
                            'x-auth-token': token
                        }
                    }
                );

                navigate(-1);
            } catch (error) {
                console.log('Error delete Event:', error);

            }
        }
    }



    return (
        <div>
            <div className={isDark ? 'darkFrame' : 'lightFrame'}>

                <div>
                    <button onClick={() => {
                        navigate('/', { state: { uiState } });
                    }}
                    >
                        Back
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
                                    {(event.zoomLink) ?
                                        (
                                            <p>
                                                <a href={event.zoomLink}
                                                    target="_blank" rel="noopener noreferrer">
                                                    Zoom Link</a>
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
                                //  onClick={image}
                                >
                                    <img src={event.image?.url} alt={event.image?.alt} className="eventImage" />
                                    {/* <img src={event.image?.url} alt={event.image?.alt} className="eventImage" /> */}
                                </div>


                            </div>

                        </>
                    )
                }
            </div>
        </div >
    )
};

export default ViewEvent;
