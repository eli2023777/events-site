import React, { useState, useEffect, useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GeneralContext } from '../App';
import { jwtDecode } from 'jwt-decode';


const Calendar = ({ setIsView, setEventID }) => {

    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const { API, setLoading } = useContext(GeneralContext);
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;


    const fetchEvents = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`${API}/events`);

            const formattedEvents = response.data.map(event => ({
                id: event._id,
                title: event.title,
                start: event.date,
                time: event.time,
                zoomLink: event.zoomLink,
            }));

            setEvents(formattedEvents);


        } catch (error) {
            console.log('Error fetching Events:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);


    const handleEventClick = (info) => {
        setIsView(true);
        setEventID(info.event.id.toString());


        // פונקציה להוספת אירוע חדש על בסיס לחיצה על תאריך ביומן
        // const title = prompt('Enter event title:');
        // if (title) {
        //     setEvents([...events, { title, date: info.dateStr }]);
        // }
    };

    const handleDateClick = (info) => {
        console.log('info', info);
        const date = info.dateStr;

        navigate('/view-date', { state: { date } });
    };

    return (
        <div>
            {decodedToken && decodedToken.isBusiness &&

                <button onClick={() => navigate('/new-event')}>
                    Add new event
                </button>

            }

            {/* } */}
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                eventClick={handleEventClick}
                dateClick={handleDateClick}
            />
        </div >
    )
}

export default Calendar
