import React, { useState, useEffect, useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../App';
import { jwtDecode } from 'jwt-decode';
import { METHOD } from '../hooks/useAPI';
import useAPI from '../hooks/useAPI';



const Calendar = ({ events, setEvents, setIsView, setEventID }) => {

    const navigate = useNavigate();
    const { apiData, setApiData, setLoading } = useContext(GeneralContext);
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    const [calendarEvents, setCalendarEvents] = useState()

    const [error, callAPI] = useAPI();


    useEffect(() => {

        callAPI(METHOD.GET_ALL, 'events');
    }, []);


    useEffect(() => {
        if (apiData && Array.isArray(apiData)) {

            setEvents(apiData);

            const formattedEvents = apiData.map(event => ({
                id: event._id,
                title: event.title,
                start: event.date,
                time: event.time,
                location: event.location,
            }));
            setCalendarEvents(formattedEvents);

            // Reset apiData
            setApiData(null);
        }

    }, [apiData]);



    const handleEventClick = (info) => {
        console.log(info.event);
        setIsView(true);
        setEventID(info.event.id.toString());
    };

    const handleDateClick = (info) => {
        console.log('info', info);
        const date = info.dateStr;

        navigate('/view-date', { state: { date } });
    };

    return (
        <div>


            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={calendarEvents}
                eventClick={handleEventClick}
                dateClick={handleDateClick}
            />
        </div >
    )
}

export default Calendar
