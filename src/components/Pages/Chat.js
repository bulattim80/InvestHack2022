import { React, useEffect, useState } from 'react';

import Babble from '../Widgets/Babble';
import FormMessage from '../Widgets/FormMessage';
import Header from '../Widgets/Header';
// import MessageForm from './MessageForm';

export default function Chat() {
    const role = sessionStorage.getItem("role");
    const userId = sessionStorage.getItem("userId");
    const token = localStorage.getItem('jwtToken');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [selfInfo, setSelf] = useState();
    const [companionInfo, setCompanionInfo] = useState();


    const getUserInfo = async (userId) => {
        return fetch("https://hack.invest-open.ru/user/info?userId=" + userId, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + token
            },
            redirect: 'follow'
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then(resJson => {
                return resJson;
            })
            .catch(error => {
                console.log('error', error);
                setError(true);
            })
            .finally(() => setLoading(false));
    }

    var result = [];

    const options = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + token
        },
        redirect: 'follow'
    };

    const getUsersInfo = async (messages) => {
        console.log("in func getUsersInfo", data);
        console.log("in func foreach", messages[0]);
        getUserInfo(userId).then((res) => {
            setSelf({
                surname: res.surname,
                name: res.name,
                middleName: res.middleName,
                avatar: res.avatar
            });
        });
        if (messages.length == 0) return;
        let compId = messages[0].sender;
        if (compId == userId) compId = messages[0].recipient;
        getUserInfo().then((res) => {
            setCompanionInfo({
                surname: res.surname,
                name: res.name,
                middleName: res.middleName,
                avatar: res.avatar
            });
        });
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        const fetchMessages = async (dialogId) => {
            return fetch("https://hack.invest-open.ru/chat/history?dialogId="
                + dialogId, options)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw response;
                })
                .then(resJson => {
                    setData(resJson);
                    console.log("in func", resJson);
                    return resJson;
                })
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
            .then(dialogId => fetchMessages(dialogId))
            .then(messages => {
                setData(messages);
                console.log("in then", messages);
                console.log("in then data", data);
                getUsersInfo(messages)
            })
        console.log("in end of useEffect", data);
    }, [])

    const getName = (mesUserId) => {
        // if (userId === mesUserId) {
        //     return selfInfo.surname + " " + selfInfo.name + " " + selfInfo.middleName;
        // } else {
        //     return companionInfo.surname + " " + companionInfo.name + " " + companionInfo.middleName;
        // }
        return "Test";
    }

    // getUsersInfo(data);
    if (loading) return "Loading...";
    if (error) return "Error!";

    console.log("after error", data);
    // console.log(selfInfo);
    // console.log(companionInfo);

    for (let index = data.messages.length - 1; index >= 0; index--) {
        result.push(Babble(data.messages[index],
            userId == data.messages[index].sender,
            getName(data.messages[index].sender)));
    }
    return (
        <div class="container">
            <div class="row d-flex justify-content-center">
                <div class="col-12">
                    <div>
                        <Header />
                        {result}
                        <FormMessage />
                    </div>
                </div>
            </div>
        </div>
    );
}
