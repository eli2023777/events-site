import { React, useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Solid icones
import {
    faUser as faUserSolid,
    faEdit as faEditSolid,
    faTrash as faTrashSolid,
    faCalendarDays as faCalendarDaysSolid,
    faList as faListSolid
} from '@fortawesome/free-solid-svg-icons';

// Regular icons
import {
    faUser as faUserRegular,
    faEdit as faEditRegular,
    faTrashAlt as faTrashRegular,
    faCalendarDays as faCalendarDaysRegular,
    faListAlt as faListRegular
} from '@fortawesome/free-regular-svg-icons';

// Add all icons to library
library.add(faUserSolid, faEditSolid, faTrashSolid, faCalendarDaysSolid, faListSolid,
    faUserRegular, faEditRegular, faTrashRegular, faCalendarDaysRegular, faListRegular);


export const DualIcon = ({ iconName }) => {
    const [isSolid, setIsSolid] = useState(false); // בוחר אם להציג ב-solid או regular

    // Map of Icons names by their types
    const iconMap = {
        user: { solid: faUserSolid, regular: faUserRegular },
        edit: { solid: faEditSolid, regular: faEditRegular },
        trash: { solid: faTrashSolid, regular: faTrashRegular },
        calendar: { solid: faCalendarDaysSolid, regular: faCalendarDaysRegular },
        list: { solid: faListSolid, regular: faListRegular }
    };

    // Choose regular or solid
    const currentIcon = iconMap[iconName] ? // Check if the name if exsist in map
        (isSolid ? iconMap[iconName].solid : iconMap[iconName].regular) :
        null;


    return (
        <FontAwesomeIcon icon={currentIcon}
            onMouseEnter={() => setIsSolid(true)}
            onMouseLeave={() => setIsSolid(false)} />
    );
};
