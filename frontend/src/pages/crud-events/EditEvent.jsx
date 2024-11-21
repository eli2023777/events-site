import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
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
                            <Button variant="success" type="submit"  >
                                Submit
                            </Button>


                            <Button variant="none" type="reset" >
                                <svg width={'25px'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fb4646" d="M142.9 142.9c-17.5 17.5-30.1 38-37.8 59.8c-5.9 16.7-24.2 25.4-40.8 19.5s-25.4-24.2-19.5-40.8C55.6 150.7 73.2 122 97.6 97.6c87.2-87.2 228.3-87.5 315.8-1L455 55c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2l0 128c0 13.3-10.7 24-24 24l-8.4 0c0 0 0 0 0 0L344 224c-9.7 0-18.5-5.8-22.2-14.8s-1.7-19.3 5.2-26.2l41.1-41.1c-62.6-61.5-163.1-61.2-225.3 1zM16 312c0-13.3 10.7-24 24-24l7.6 0 .7 0L168 288c9.7 0 18.5 5.8 22.2 14.8s1.7 19.3-5.2 26.2l-41.1 41.1c62.6 61.5 163.1 61.2 225.3-1c17.5-17.5 30.1-38 37.8-59.8c5.9-16.7 24.2-25.4 40.8-19.5s25.4 24.2 19.5 40.8c-10.8 30.6-28.4 59.3-52.9 83.8c-87.2 87.2-228.3 87.5-315.8 1L57 457c-6.9 6.9-17.2 8.9-26.2 5.2S16 449.7 16 440l0-119.6 0-.7 0-7.6z" /></svg>
                            </Button>                        </form>
                    </>

                )}
            </div>
        </div>
    )
}

export default EditEvent;
