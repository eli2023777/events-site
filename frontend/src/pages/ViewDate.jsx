import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GeneralContext } from '../App';
import { jwtDecode } from 'jwt-decode';


const ViewDate = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { date } = location.state || {};
    const [events, setEvents] = useState([]);
    const { API, setLoading } = useContext(GeneralContext);
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    console.log(decodedToken);


    // const url = `http://localhost:7000/events/by-date?date=${date}`;


    const getEvents = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`${API}/events/by-date?date=${date}`);
            setEvents(response.data);
            console.log(response.data);


        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (date)
            getEvents();
    }, [date]);


    const handleEventClick = (eventID) => {
        navigate(`/view-event`, { state: { eventID } })
    };


    return (
        <div>
            <h2>{(new Date(date)).toLocaleDateString('en-GB')}</h2>
            <button onClick={() => navigate('/')}>Back to Events</button>
            {decodedToken && (decodedToken.isAdmin || decodedToken.isBusiness) &&
                <button onClick={() => navigate('/new-event', { state: { date } })}>
                    Add new Event
                </button>
            }

            {
                events.length > 0 &&
                events.map(event => (
                    <div key={event._id}
                        style={{
                            backgroundImage: `url(${event.image?.url})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            padding: '20px',
                        }}
                        onClick={() => handleEventClick(event._id)}>
                        <h3>{event.title}</h3>
                        <p>Date: {new Date(event.date).toLocaleDateString('en-GB')}</p>
                        <p>Time: {event.time}</p>
                        <p>Zoom Link: {event.zoomLink}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default ViewDate


