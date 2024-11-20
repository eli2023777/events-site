import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GeneralContext } from '../App';


const Results = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { results } = location.state || '';
    const { setLoading } = useContext(GeneralContext);
    const isDark = localStorage.getItem('isDark');


    const handleEventClick = (eventID) => {
        navigate(`/view-event`, { state: { eventID } })

    }



    return (
        <div>
            <div className={isDark ? 'darkFrame' : 'lightFrame'}>
                <h1>Results</h1>

                {!(results?.length > 0) ? (
                    <div className='noData'>No Results found</div>
                ) :
                    (

                        <div className='grid'>


                            {results.map(
                                (event, index) => {
                                    const eventDate = new Date(event.date);
                                    const eventID = event._id;

                                    return (
                                        <div key={index} className='event'
                                            onClick={() => handleEventClick(eventID)}
                                            style={{
                                                backgroundImage: `url(${event.image?.url})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                padding: '20px',
                                            }}
                                        >
                                            <h2>{event.title}</h2>
                                            <p>{eventDate.toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            }
                                            )}</p>
                                            <p>{event.time}</p>
                                            <p>{event.location}</p>

                                        </div>
                                    )
                                }
                            )}
                        </div>
                    )

                }
            </div>
        </div>
    )
}

export default Results

