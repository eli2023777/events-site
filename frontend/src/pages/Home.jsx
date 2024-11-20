import React, { useState, useEffect, useContext } from 'react';
import Calendar from '../components/Calendar.jsx';
import EventsList from '../components/EventsList.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { UI_STATE } from '../helpers/uiStateObj.jsx';
import { DualIcon } from '../helpers/DualIcon.jsx';
import { GeneralContext } from '../App';
import useAPI from '../hooks/useAPI';
import { jwtDecode } from 'jwt-decode';



const Home = () => {

    const { apiData, setApiData, isDark } = useContext(GeneralContext);
    const location = useLocation();
    const [uiState, setUIState] = useState(location.state ? UI_STATE.EVENTS : UI_STATE.CALENDAR);
    const [isView, setIsView] = useState(false);
    const [eventID, setEventID] = useState();
    const [events, setEvents] = useState([]);
    const token = localStorage.getItem('token');

    const decodedToken = token ? jwtDecode(token) : null;
    const [isHoveredIcon, setIsHoveredIcon] = useState(false);

    const navigate = useNavigate();

    const [error, callAPI, payload] = useAPI();



    useEffect(() => {

        if (apiData && Array.isArray(apiData)) {
            setEvents(apiData);
        }

        // Reset apiData
        setApiData(null);
    }, [apiData]);


    useEffect(() => {
        if (isView) {
            navigate(`/view-event`, { state: { eventID, isView, uiState } });
        }
    }, [isView, eventID]);


    return (

        <div>

            <div className={isDark ? 'darkFrame' : 'lightFrame'}>

                <p>Welcome to our events website!</p>

                {/* Add new event */}
                {decodedToken && decodedToken.isBusiness &&
                    <button
                        className='plusIcon'
                        style={{
                            ...(isHoveredIcon && { transform: 'scale(1.2)' })
                        }}
                        onMouseEnter={() => setIsHoveredIcon(true)}
                        onMouseLeave={() => setIsHoveredIcon(false)}
                        onClick={() => navigate('/new-event', { state: { uiState } })}>
                        <DualIcon iconName="plus" />
                    </button>
                }

                <br />
                <br />


                {uiState === UI_STATE.CALENDAR &&
                    <div>
                        <button onClick={() => setUIState(UI_STATE.EVENTS)}>
                            {/*List Icon */}
                            <DualIcon iconName="list" />
                        </button>
                        <Calendar
                            events={events}
                            setEvents={setEvents}
                            setIsView={setIsView}
                            setEventID={setEventID} />
                    </div>
                }

                {uiState === UI_STATE.EVENTS &&
                    <div>
                        <button onClick={() => setUIState(UI_STATE.CALENDAR)}>
                            {/*Calendar Icon */}
                            <DualIcon iconName="calendar" />
                        </button>
                        <EventsList
                            // events={events}
                            // setEvents={setEvents}
                            setIsView={setIsView}
                            setEventID={setEventID} />
                    </div>
                }

            </div>

        </div>
    )
}

export default Home
