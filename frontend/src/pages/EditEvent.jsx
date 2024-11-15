import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { GeneralContext } from '../App';



const EditEvent = () => {
    const location = useLocation();
    const { eventID } = location.state || {};
    const [event, setEvent] = useState({});
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const { API, setLoading } = useContext(GeneralContext);


    const url = `${API}/events/${eventID}`;


    const getEvent = async () => {

        try {
            const response = await axios.get(url);
            setEvent(response.data);


        } catch (error) {
            console.log('Error get Event:', error);
        }
    };

    useEffect(() => {
        getEvent();
    }, []);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent((prevEvent) => ({
            ...prevEvent, // שמירת השדות הקיימים
            [name]: value // עדכון השדה ששונה
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        editEvent();
    };


    const editEvent = async () => {

        try {
            const response = await axios.put(url, event);
            setEvent(response.data);

            navigate(-1); // Back to main page after success

        } catch (error) {
            console.log('Error editing Event:', error);
        }
    };



    return (
        <div>
            <div className='frame'>

                <button onClick={() => navigate(-1)}>Back</button>
                <br />
                <br />

                {event && (
                    <>
                        <form onSubmit={handleSubmit}>
                            <label for="title">Title</label>
                            <input type="text" name="title" value={event.title || ''} onChange={handleChange} />
                            <br />
                            <br />
                            <label for="time">Time</label>
                            <input type="text" name="time" value={event.time || ''} onChange={handleChange} />
                            <br />
                            <br />
                            <label for="zoom-link">Zoom Link </label>
                            <input type="text" name="zoomLink" value={event.zoomLink || ''} onChange={handleChange} />
                            <br />
                            <br />
                            <button type="submit">Submit</button>
                        </form>
                    </>

                )}
            </div>
        </div>
    )
}

export default EditEvent;
