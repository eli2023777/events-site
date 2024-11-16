import React, { useState, useEffect, useContext } from 'react';
import Calendar from '../components/Calendar.jsx';
import EventsList from '../components/EventsList.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { UI_STATE } from '../helpers/uiStateObj.jsx';
import { DualIcon } from '../helpers/DualIcon.jsx';
import { GeneralContext } from '../App';



const Home = () => {

    const { isDark } = useContext(GeneralContext);
    const location = useLocation();
    const [uiState, setUIState] = useState(location.state ? UI_STATE.EVENTS : UI_STATE.CALENDAR);
    const [isView, setIsView] = useState(false);
    const [eventID, setEventID] = useState();


    // const [isIconHover, setIsIconHover] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (isView) {
            navigate(`/view-event`, { state: { eventID, isView, uiState } });
        }
    }, [isView, eventID]);



    return (

        <div>

            <div className={isDark ? 'darkFrame' : 'lightFrame'}>

                <p>Welcome to our events website!</p>


                {uiState === UI_STATE.CALENDAR &&
                    <div>
                        <button onClick={() => setUIState(UI_STATE.EVENTS)}>
                            <DualIcon iconName="list" />

                        </button>
                        <Calendar setIsView={setIsView} setEventID={setEventID} />
                    </div>
                }

                {uiState === UI_STATE.EVENTS &&
                    <div>
                        <button onClick={() => setUIState(UI_STATE.CALENDAR)}>
                            <DualIcon iconName="calendar" />
                        </button>
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

        </div>
    )
}

export default Home
