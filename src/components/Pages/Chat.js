import { React, useEffect, useState } from 'react';

import Babble from '../Widgets/Babble';
// import MessageForm from './MessageForm';

export default function Chat() {
    const role = sessionStorage.getItem("role");
    const userId = sessionStorage.getItem("userId");
    const token = localStorage.getItem('jwtToken');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [users, setUsers] = useState(new Map());

    function GetName(userId) {
        console.log("users add0", users);
        // if (users.get(userId) == null) {
        //     getUserInfo(userId).then((res) => {
        //         console.log("users add1", users);
        //         const newUsers = users;
        //         newUsers.set(userId,
        //             {
        //                 surname: res.surname,
        //                 name: res.name,
        //                 middleName: res.middleName,
        //                 avatar: res.avatar
        //             });
        //         setUsers(newUsers);
        //         console.log("users add2", users);
        //     });
        // }
        console.log("users add3", users);
        const user = users.get(userId);
        // return user.surname + " " + user.name + " " + user.middleName;
    }


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
        const getUsersInfo = async (messages) => {
            messages.forEach(element => {
                getUserInfo(element.userId).then((res) => {
                    const newUsers = users;
                    newUsers.set(element.userId,
                        {
                            surname: res.surname,
                            name: res.name,
                            middleName: res.middleName,
                            avatar: res.avatar
                        });
                    setUsers(newUsers);
                });
            });
        }
        fetchDialogId()
            .then(dialogId => fetchMessages(dialogId))
            .then(() => getUsersInfo(data));
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
