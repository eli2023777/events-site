import { React, useContext, useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Solid icones
import {
    faEdit as faEditSolid,
    faTrash as faTrashSolid,
    faCalendarDays as faCalendarDaysSolid,
    faList as faListSolid,
    faMoon as faMoonSolid,
    faSun as faSunSolid,
    faPlus,
    faBackward,
} from '@fortawesome/free-solid-svg-icons';

// Regular icons
import {
    faEdit as faEditRegular,
    faTrashAlt as faTrashRegular,
    faCalendarDays as faCalendarDaysRegular,
    faListAlt as faListRegular,
    faMoon as faMoonRegular,
    faSun as faSunRegular,
} from '@fortawesome/free-regular-svg-icons';



// Add all icons to library
library.add(faEditSolid, faTrashSolid, faCalendarDaysSolid,
    faListSolid, faPlus, faMoonSolid, faSunSolid, faBackward,
    faEditRegular, faTrashRegular, faCalendarDaysRegular,
    faListRegular, faMoonRegular, faSunRegular,);


export const DualIcon = ({ iconName }) => {
    const [isSolid, setIsSolid] = useState(false); // בוחר אם להציג ב-solid או regular

    // Map of Icons names by their types
    const iconMap = {
        edit: { solid: faEditSolid, regular: faEditRegular },
        trash: { solid: faTrashSolid, regular: faTrashRegular },
        calendar: { solid: faCalendarDaysSolid, regular: faCalendarDaysRegular },
        list: { solid: faListSolid, regular: faListRegular },
        plus: { solid: faPlus, regular: faPlus },
        backward: { solid: faBackward, regular: faBackward },
        moon: { solid: faMoonSolid, regular: faMoonRegular },
        sun: { solid: faSunSolid, regular: faSunRegular },
    };

    // Choose regular or solid
    const currentIcon = iconMap[iconName] ? // Check if the name if exsist in map
        (isSolid ? iconMap[iconName].solid : iconMap[iconName].regular) :
        null;


    return (
        <FontAwesomeIcon icon={currentIcon}

            // Define dark / light icons size
            size={iconName === 'moon' || iconName === 'sun' ? 'lg' : undefined}

            onMouseEnter={() => setIsSolid(true)}
            onMouseLeave={() => setIsSolid(false)}
        />
    );
};
