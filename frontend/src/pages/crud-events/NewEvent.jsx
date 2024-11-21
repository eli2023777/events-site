import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../App';
import useAPI from '../../hooks/useAPI';
import { METHOD } from '../../hooks/useAPI';
import { DualIcon } from '../../helpers/DualIcon';
import { UI_STATE } from '../../helpers/uiStateObj.jsx';


const NewEvent = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const { date, uiState } = location.state || '';
    const [newDate, setNewDate] = useState(date)
    const [newEvent, setNewEvent] = useState({ date });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { setLoading } = useContext(GeneralContext);
    const isDark = localStorage.getItem('isDark');
    const [message, setMesssage] = useState('');

    const [error, callAPI, payload, data] = useAPI();


    const handleChange = (e) => {
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    }

    const handleChangeDate = (e) => {
        setNewDate(e.target.value);
        setNewEvent({ ...newEvent, date: e.target.value });
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        callAPI(METHOD.CREATE, 'events', newEvent);
    }


    useEffect(() => {
        if (data && Object.keys(data).length > 0) {

            setNewEvent(data);
            setMesssage('New event successfully added!');
            const timer = setTimeout(() => {
                navigate('/');
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [data]);




    return (
        <div>
            <div className={isDark ? 'darkFrame' : 'lightFrame'}>

                <button
                    onClick={() => {
                        navigate('/', {
                            state:
                                uiState === UI_STATE.EVENTS ? true : undefined
                        })
                    }}>
                    <DualIcon iconName="backward" />
                </button>
                <br />
                <br />

                <h1>New Event</h1>

                <br />
                <br />

                <Form onSubmit={handleSubmit}>


                    <Form.Group className="mb-3 grid-item" controlId="formBasicName">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="title" name='title' placeholder="title" onChange={handleChange} />
                    </Form.Group>
                    <br />

                    <Form.Group className="mb-3 grid-item" controlId="formBasicName">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" name='date' placeholder="date" value={newDate} required onChange={handleChangeDate} />
                    </Form.Group>


                    <br />
                    <Form.Group className="mb-3 grid-item" controlId="formBasicName">
                        <Form.Label>Time</Form.Label>
                        <Form.Control type="time" name='time' placeholder="time" required onChange={handleChange} />
                    </Form.Group>

                    <br />


                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="location" name="location" placeholder="location"
                            onChange={handleChange} />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPhone">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control type="url" name="url" placeholder="url" onChange={handleChange} />

                    </Form.Group>

                    <div>
                        <Button variant="success" type="submit"  >
                            Submit
                        </Button>


                        <Button variant="none" type="reset" >
                            <svg width={'25px'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fb4646" d="M142.9 142.9c-17.5 17.5-30.1 38-37.8 59.8c-5.9 16.7-24.2 25.4-40.8 19.5s-25.4-24.2-19.5-40.8C55.6 150.7 73.2 122 97.6 97.6c87.2-87.2 228.3-87.5 315.8-1L455 55c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2l0 128c0 13.3-10.7 24-24 24l-8.4 0c0 0 0 0 0 0L344 224c-9.7 0-18.5-5.8-22.2-14.8s-1.7-19.3 5.2-26.2l41.1-41.1c-62.6-61.5-163.1-61.2-225.3 1zM16 312c0-13.3 10.7-24 24-24l7.6 0 .7 0L168 288c9.7 0 18.5 5.8 22.2 14.8s1.7 19.3-5.2 26.2l-41.1 41.1c62.6 61.5 163.1 61.2 225.3-1c17.5-17.5 30.1-38 37.8-59.8c5.9-16.7 24.2-25.4 40.8-19.5s25.4 24.2 19.5 40.8c-10.8 30.6-28.4 59.3-52.9 83.8c-87.2 87.2-228.3 87.5-315.8 1L57 457c-6.9 6.9-17.2 8.9-26.2 5.2S16 449.7 16 440l0-119.6 0-.7 0-7.6z" /></svg>
                        </Button>
                    </div>

                </Form>

            </div>
        </div >



    )
}

export default NewEvent
