import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

function FormMessage(props) {
    return (
        <div className="FormMessage mt-5">
            <div class="form-group fixed-bottom navbar-light bg-light p-1 m-0">
                <div class='formIcons p-2'>                
                <FontAwesomeIcon icon={faPaperclip} />
                </div>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="1" placeholder='Введите сообщение'></textarea>
                <div class='formIcons p-2'>                
                <FontAwesomeIcon icon={faPaperPlane} />
                </div>
            </div>
        </div>
    );
}

export default FormMessage;
