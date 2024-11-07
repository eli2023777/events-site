import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const Results = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { results } = location.state || '';

    const handleEventClick = (eventID) => {
        navigate(`/view-event`, { state: { eventID } })

    }

    // const deleteEvent = async (eventID) => {
    //     try {
    //         await axios.delete(`http://localhost:7000/events/${eventID}`);
    //         navigate(-1);
    //     } catch (error) {
    //         console.log('Error delete Event:', error);
    //     }
    // }


    return (
        <div>

            {results.map(
                (event, index) => {
                    const eventDate = new Date(event.date);
                    const eventID = event._id;

                    return (
                        <div key={index} className='event'
                            onClick={() => handleEventClick(eventID)}
                        >
                            <h2>{event.title}</h2>
                            <p>Date: {eventDate.toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }
                            )}</p>
                            <p>Time: {event.time}</p>
                            <p>Zoom Link: {event.zoomLink}</p>

                            {/* <button onClick={() => navigate('/edit-event', { state: { eventID } })}>Edit</button>
                            <button onClick={() => deleteEvent(eventID)}>Delete</button> */}
                        </div>
                    )
                }
            )}

        </div>
    )
}

export default Results

