import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faUser } from '@fortawesome/free-regular-svg-icons'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
    return (
        <div className="header">
            <nav class="navbar fixed-top navbar-light justify-content-space-betweeen">

            <FontAwesomeIcon icon="fa-solid fa-user" />

            <div class='headerIconsL p-2'>                
                <FontAwesomeIcon icon={faCircleUser} />
                </div>

                <div className="cb">
                    <h1>Иванов Андрей</h1>
                    <p>Брокер</p>
                </div>

                <div class='headerIconsR p-2'>                
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </div>


            </nav>
        </div>
    );
}