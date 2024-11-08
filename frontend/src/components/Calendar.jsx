import React, { useState, useEffect, useContext } from 'react';
import '../css/calendar.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GeneralContext } from '../App';


const Calendar = ({ setIsView, setEventID }) => {

    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const { setLoading } = useContext(GeneralContext);


    const url = 'http://localhost:7000/events';

    const fetchEvents = async () => {
        setLoading(true);

        try {
            const response = await axios.get(url);

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
            <button onClick={() => navigate('/new-event')}>
                Add new event
            </button>

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
