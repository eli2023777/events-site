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
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>

                        <Button variant="primary" type="reset">
                            Reset
                            {/* --- ADD HERE Reset icon --- */}
                        </Button>
                    </div>

                </Form>

            </div>
        </div >



    )
}

export default NewEvent
