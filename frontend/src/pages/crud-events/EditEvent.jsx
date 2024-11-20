import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../App';
import useAPI from '../../hooks/useAPI';
import { METHOD } from '../../hooks/useAPI';
import { DualIcon } from '../../helpers/DualIcon';



const EditEvent = () => {
    const location = useLocation();
    const { eventID } = location.state || {};
    const [event, setEvent] = useState({});
    const navigate = useNavigate();
    const { setLoading } = useContext(GeneralContext);
    const isDark = localStorage.getItem('isDark');

    const [error, callAPI, payload, data] = useAPI();



    useEffect(() => {
        callAPI(METHOD.GET_ONE, 'events', eventID);
    }, []);

    useEffect(() => {
        if (data)
            setEvent(data);

    }, [data]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent((prevEvent) => ({
            ...prevEvent,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        callAPI(METHOD.UPDATE, 'events', event);
        if (data) {
            navigate(-1); // Go Back after success
        }
    };



    return (
        <div>
            <div className={isDark ? 'darkFrame' : 'lightFrame'}>

                <button onClick={() => navigate(-1)}>
                    <DualIcon iconName="backward" />
                </button>
                <br />
                <br />

                <h1>Edit Prophile</h1>
                <br /><br />

                {event && (
                    <>
                        <form onSubmit={handleSubmit}>
                            <label for="title">Title</label>
                            <input type="text" name="title" value={event.title || ''} onChange={handleChange} />
                            <br />
                            <br />
                            <label for="date">Date</label>
                            <input type="date" name="date" value={event.date || ''} onChange={handleChange} />
                            <br />
                            <br />
                            <label for="time">Time</label>
                            <input type="time" name="time" value={event.time || ''} onChange={handleChange} />
                            <br />
                            <br />
                            <label for="zoom-link">Location / Zoom Link</label>
                            <input type="text" name="location" value={event.location || ''} onChange={handleChange} />
                            <br />
                            <br />
                            <label for="image-url">Image URL</label>
                            <input type="url" name="url" value={event.image?.url || ''} onChange={handleChange} />
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
