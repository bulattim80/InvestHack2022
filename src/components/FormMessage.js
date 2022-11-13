import { React, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

export default function FormMessage({ updateMessages }) {
    const token = localStorage.getItem('jwtToken');
    const dialogId = parseInt(sessionStorage.getItem('dialogId'));
    const [message, setMessage] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        await fetch("https://hack.invest-open.ru/message/send", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + token
            },
            body: JSON.stringify({
                message: {
                dialogId: dialogId,
                text: message,
                messageType: "TEXT",
                }
            }),
        }).then((res) =>
        {
            if (!res.ok)
            {
                throw res;
            } else
            {
                updateMessages();
            }
        }).catch(error => console.log("messagePost", error));
        document.getElementById("exampleFormControlTextarea1").value = "";
    }
    const onEnterPress = (e) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            handleSubmit(e);
        }
    }
    return (
        <div class="FormMessage" onKeyDown={onEnterPress}>
            <form onSubmit={handleSubmit}>
                <div class="form-group fixed-bottom navbar-light bg-light p-1 m-0">
                    <div class='formIcons p-2'>
                        <FontAwesomeIcon icon={faPaperclip} />
                    </div>
                    <textarea onChange={e => setMessage(e.target.value)} class="form-control" id="exampleFormControlTextarea1" rows="1" placeholder='Введите сообщение' />
                    <div class='formIcons p-2'>
                        <label>
                            <FontAwesomeIcon icon={faPaperPlane} />
                            <input type="submit" hidden/>
                        </label>
                    </div>
                </div>
            </form>
        </div>
    );
}

FormMessage.propTypes = {
    updateMessages: PropTypes.func.isRequired
}