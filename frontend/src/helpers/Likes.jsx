import { React, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { METHOD } from '../hooks/useAPI';
import useAPI from '../hooks/useAPI';


library.add(faHeartSolid, faHeartRegular);

const Likes = ({ event, setEvents, isLiked, setIsPatch }) => {



    const [likes, setLikes] = useState(() => {
        // Load likes from localStorage or initialize as empty object
        const savedLikes = localStorage.getItem('likes');
        return savedLikes ? JSON.parse(savedLikes) : {};
    });
    const [hoveredEventID, setHoveredEventID] = useState(null);
    const eventID = event._id;
    const token = localStorage.getItem('token');

    const [error, callAPI, payload, data] = useAPI();


    const LikeEvent = async (e, eventID) => {
        e.stopPropagation();
        if (setIsPatch)
            setIsPatch(true);

        if (!token) {
            alert('You need to log-in or register to like events')
        } else {
            callAPI(METHOD.PATCH, 'events', eventID);
        }
    }

    useEffect(() => {
        if (data && data._id && data.likes !== undefined) { // 2. LIKE/UNLIKE (PATCH) event case.

            setLikes((prevLikes) => {
                const updatedLikes = {
                    ...prevLikes,
                    [payload]: !prevLikes[payload], // Toggle like state
                };
                localStorage.setItem('likes', JSON.stringify(updatedLikes));
                return updatedLikes;
            });

            // Update the events with the new likes count from the server
            setEvents(prevEvents =>
                prevEvents.map(event =>
                    event._id === payload
                        ? { ...event, likes: data.likes } // Update likes from server response
                        : event
                )
            );

            // Reset the Patch state after request
            if (setIsPatch)
                setIsPatch(false);

        }

        setLikes(likes);

    }, [data, payload, likes])

    return (
        <div
            onMouseEnter={() => setHoveredEventID(eventID)}
            onMouseLeave={() => setHoveredEventID(null)}
            onClick={(e) => LikeEvent(e, eventID)}>
            {event.likes?.length} {<FontAwesomeIcon
                icon={(isLiked || hoveredEventID === eventID) ?
                    faHeartSolid : faHeartRegular} style={{ color: "#f43325" }}
            />
            }
        </div>
    )
}

export default Likes
