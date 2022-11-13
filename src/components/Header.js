import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faUser } from '@fortawesome/free-regular-svg-icons'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

export default function Header(props) {
    const companionInfo = props.companionInfo;
    const role = props.role;
    return (
        <div class="header">
            <nav class="navbar fixed-top navbar-light justify-content-space-betweeen">

                <div class='headerIconsL p-2'>
                    <Link to="/profile"><FontAwesomeIcon icon={faCircleUser} /></Link>
                </div>

                <div class="cb">
                    <h1>{companionInfo.surname + " " + companionInfo.name + " " + companionInfo.middleName}</h1>
                    <p>{role === "CLIENT" ? "Брокер" : "Клиент"}</p>
                </div>

                <div class='headerIconsR p-2'>
                    <Link to="/logout"><FontAwesomeIcon icon={faArrowRightFromBracket} /></Link>
                </div>
            </nav>
        </div>
    );
}