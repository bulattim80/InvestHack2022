import { React, useEffect, useState } from 'react';

import Babble from '../Widgets/Babble';
import FormMessage from '../FormMessage';
import Header from '../Header';
// import MessageForm from './MessageForm';

export default function Chat() {
    const role = sessionStorage.getItem("role");
    const token = localStorage.getItem('jwtToken');
    const userId = sessionStorage.getItem("userId");

    const [dialogId, setDialogId] = useState(-1);
    const [loadingDId, setLoadingDId] = useState(true);
    const [errorDId, setErrorDId] = useState(false);

    const [messages, setMessages] = useState({ messages: [] });
    const [loadingMes, setLoadingMes] = useState(true);
    const [errorMes, setErrorMes] = useState(false);

    const [selfInfo, setSelfInfo] = useState();
    const [loadingSelf, setLoadingSelf] = useState(true);
    const [errorSelf, setErrorSelf] = useState(false);

    const [companionInfo, setCompInfo] = useState();
    const [loadingComp, setLoadingComp] = useState(true);
    const [errorComp, setErrorComp] = useState(false);

    const options = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + token
        },
        redirect: 'follow'
    };

    var result = [];

    const refetchMes = async () => {
        fetch("https://hack.invest-open.ru/chat/history?dialogId=" + sessionStorage.getItem("dialogId"), options)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then(newMessages => {
                let res = JSON.parse(sessionStorage.getItem("messages"));
                setMessages(newMessages);
                if (res.messages.length != newMessages.messages.length) {
                    console.log("new messages");
                    window.scrollTo(0, document.body.scrollHeight);
                }
            })
            .catch((err) => {
                setErrorMes(err);
            });
    };

    const refetch = async () => {
        refetchMes();
    }

    useEffect(() => {
        fetch("https://hack.invest-open.ru/chat/dialog", options)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then(json => {
                return json.dialogId;
            })
            .then(newDialogId => {
                setDialogId(newDialogId);
                fetch("https://hack.invest-open.ru/chat/history?dialogId=" + newDialogId, options)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        }
                        throw response;
                    })
                    .then(messages => {
                        sessionStorage.setItem("messages", JSON.stringify(messages));
                        setMessages(messages);
                        let compId = "";
                        if (messages.messages.length > 1) {
                            compId = (messages.messages[0].sender == userId ? messages.messages[0].recipient : messages.messages[0].sender) + '';
                        }
                        return compId;
                    })
                    .then(compId => {
                        return fetch("https://hack.invest-open.ru/user/info?userId=" + compId, {
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
                            .then(res => {
                                setCompInfo({
                                    surname: res.surname,
                                    name: res.name,
                                    middleName: res.middleName,
                                    avatar: res.avatar
                                });
                            })
                            .catch(error => {
                                console.log('error', error);
                                setErrorComp(true);
                            })
                            .finally(() => setLoadingComp(false));
                    })
                    .catch(error => {
                        console.log("error", error);
                        setErrorMes(true);
                    })
                    .finally(() => setLoadingMes(false));
            })
            .catch(error => {
                console.log("error", error);
                setErrorDId(true);
            })
            .finally(() => setLoadingDId(false));
        fetch("https://hack.invest-open.ru/user/info?userId=" + userId, {
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
            .then(res => {
                setSelfInfo({
                    surname: res.surname,
                    name: res.name,
                    middleName: res.middleName,
                    avatar: res.avatar
                });
            })
            .catch(error => {
                console.log('error', error);
                setErrorSelf(true);
            })
            .finally(() => setLoadingSelf(false));
        const timer = setInterval(() => refetch(), 1000);

        return () => clearInterval(timer);
    }, []);


    // getUsersInfo(data);
    if (loadingDId || loadingMes || loadingSelf || loadingComp) return "Loading...";
    if (errorDId) return "Error to get dialogId!";
    if (errorMes) return "Error to get messages!";
    if (errorSelf) return "Error to get info about self";
    if (errorComp) return "Error to get info about companion";

    sessionStorage.setItem("dialogId", dialogId);

    const getName = (mesUserId) => {
        if (mesUserId == userId) {
            return selfInfo.surname + " " + selfInfo.name + " " + selfInfo.middleName;
        } else {
            return companionInfo.surname + " " + companionInfo.name + " " + companionInfo.middleName;
        }
    }

    for (let index = messages.messages.length - 1; index >= 0; index--) {
        result.push(Babble(messages.messages[index],
            userId == messages.messages[index].sender,
            getName(messages.messages[index].sender)));
    }


    return (
        <div class="container">
            <div class="row d-flex justify-content-center">
                <div class="col-12">
                    <div>
                        <Header companionInfo={companionInfo} role={role}/>
                        {result}
                        <FormMessage updateMessages={() => refetchMes()} />
                    </div>
                </div>
            </div>
        </div>
    );
}
