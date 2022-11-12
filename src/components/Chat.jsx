import { React, useEffect, useState } from 'react';

import Babble from './Babble';
// import MessageForm from './MessageForm';

export default function Chat() {
    const role = sessionStorage.getItem("role");
    const userId = sessionStorage.getItem("userId");
    const token = localStorage.getItem('jwtToken');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    function GetName(id_message) {
        if (userId == id_message) {
            if (role == "OPERATOR") {
                return "Оператор";
            } else {
                return "Пользователь";
            }
        } else {
            if (role == "OPERATOR") {
                return "Пользователь";
            } else {
                return "Оператор";
            }
        }
    }

    var result = [];

    const options = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + token
        },
        redirect: 'follow'
    };

    useEffect(() => {
        setLoading(true);
        const fetchMessages = async (dialogId) => {
            fetch("https://hack.invest-open.ru/chat/history?dialogId="
                + dialogId, options)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw response;
                })
                .then(resJson => {
                    setData(resJson);
                })
                .finally(() => setLoading(false));
        }
        const fetchDialogId = async () => {
            return fetch("https://hack.invest-open.ru/chat/dialog", options)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw response;
                })
                .then(json => {
                    return json.dialogId;
                })
                .catch(error => {
                    console.log("error", error);
                    setError(true);
                });
        }
        fetchDialogId()
            .then(dialogId => {
                fetchMessages(dialogId);
            });
    }, [])

    if (loading) return "Loading...";
    if (error) return "Error!";

    for (let index = data.messages.length - 1; index >= 0; index--) {
        result.push(Babble(data.messages[index],
            userId == data.messages[index].sender,
            GetName(userId, data.messages[index].sender)));
    }
    return (
        <div class="container py-5">
            <div class="row d-flex justify-content-center">
                <div class="col-md-8 col-lg-6 col-xl-10">
                    <div>
                        {result}
                    </div>
                </div>
            </div>
        </div>
    );
}
