import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const ViewEvent = () => {
    const location = useLocation();
    const [event, setEvent] = useState();
    const { eventID } = location.state || {};
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    const url = 'http://localhost:7000';



    const getEvent = async () => {

        try {
            const response = await axios.get(`${url}/events/${eventID}`);
            setEvent(response.data);
            console.log('Event fetched:', event);
            console.log('eventID:', eventID);

        } catch (error) {
            console.log('Error get Event:', error);
        }
    };


    useEffect(() => {
        getEvent();
    }, []);

    const deleteEvent = async () => {
        try {
            await axios.delete(`${url}/events/${eventID}`);
            navigate(-1);
        } catch (error) {
            console.log('Error delete Event:', error);
        }
    }



    return (
        <div>
            <button onClick={() => {
                navigate(-1);
            }}
            >
                Back
            </button>
            {
                event && (
                    <>
                        <h2>{event.title}</h2>
                        <p>Date: {new Date(event.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        }
                        )}</p>
                        <p>Time: {event.time}</p>
                        <p>Zoom Link: {event.zoomLink}</p>

                        {token &&
                            decodedToken.isAdmin &&
                            <>
                                <button onClick={() => navigate('/edit-event', { state: { eventID } })}>Edit</button>
                                <button onClick={deleteEvent}>Delete</button>
                            </>
                        }
                    </>
                )
            }
        </div >
    )
};

export default ViewEvent;
