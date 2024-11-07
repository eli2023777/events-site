import React, { useState, useEffect } from 'react';
import Calendar from '../components/Calendar.jsx';
import EventsList from '../components/EventsList.jsx';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const UI_STATE = {
        CALENDAR: 'CALANDER',
        EVENTS: 'EVENTS'
    };

    const [uiState, setUIState] = useState(UI_STATE.CALENDAR);
    const [isView, setIsView] = useState(false);
    const [eventID, setEventID] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        if (isView) {
            navigate(`/view-event`, { state: { eventID, isView } });
        }
    }, [isView, eventID]);



    return (
        <div>

            {uiState === UI_STATE.CALENDAR &&
                <div>
                    <button onClick={() => setUIState(UI_STATE.EVENTS)}>See all Events</button>
                    <Calendar setIsView={setIsView} setEventID={setEventID} />
                </div>
            }

            {uiState === UI_STATE.EVENTS &&
                <div>
                    <button onClick={() => setUIState(UI_STATE.CALENDAR)}>See in Calendar</button>
                    <EventsList setIsView={setIsView} setEventID={setEventID} />
                </div>
            }

            {isView &&
                <div>

                    {/* <button onClick={() => setIsView(false)}>Back to Calendar</button>
                    <div>
                        <h2>Event Details</h2>
                        <p>Event ID: {eventID}</p>
                        <p>Title: {eventID}</p>
                        <p>Date: {eventID}</p>
                        <p>Time: {eventID}</p>
                        <p>Zoom Link: {eventID}</p>
                    </div> */}
                </div>
            }


        </div>
    )
}

export default Home
