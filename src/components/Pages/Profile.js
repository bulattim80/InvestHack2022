import { React, useEffect, useState } from "react"

export default function App() {
    const token = localStorage.getItem('jwtToken');
    const userId = sessionStorage.getItem("userId");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [middleName, setMiddleName] = useState();
    const [avatar, setAvatar] = useState();

    if (token == null) {
        window.location.href = '/';
    }

    useEffect(() => {
        setLoading(true);
        const getUserInfo = async () => {
            fetch("https://hack.invest-open.ru/user/info", {
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
                    console.log(resJson);
                    setName(resJson.name);
                    setSurname(resJson.surname);
                    setMiddleName(resJson.middleName);
                    setAvatar(resJson.avatar);
                })
                .catch(error => {
                    console.log('error', error);
                    setError(true);
                })
                .finally(() => setLoading(false));
        }

        getUserInfo();
    }, []);


    const handleSubmit = async e => {
        e.preventDefault();

        await fetch("https://hack.invest-open.ru/auth",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": 'Bearer ' + token
                },
                body: JSON.stringify(
                    {
                        name: name,
                        surname: surname,
                        middleName: middleName,
                        avatar: avatar
                    }
                ),
            })
            .catch(error => {
                console.log('error', error);
                setError(true);
            })
            .then(response => response.json());
        window.location.href = '/';
    }

    
    if (loading) return "Loading...";
    if (error) return "Error!";

    return (
        <div className="login-wrapper mt-5">
            <form onSubmit={handleSubmit}>
                <h1 class="h3 mb-3 fw-normal pl-7 pr-7 text-center">Профиль</h1>
                <div class="form-floating mb-3">
                    <label for="floatingInput">Фамилия</label>
                    <input type="name" onChange={e => setName(e.target.value)} class="form-control" value={name}/>
                </div>
                <div class="form-floating mb-3">
                    <label for="floatingPassword">Имя</label>
                    <input type="name" onChange={e => setSurname(e.target.value)} class="form-control" value={surname} />
                </div>
                <div class="form-floating mb-3">
                    <label for="floatingPassword">Отчество</label>
                    <input type="name" onChange={e => setMiddleName(e.target.value)} class="form-control" value={middleName}/>
                </div>
                <div class="form-floating mb-3">
                    <label for="floatingPassword">Ссылка на аватар</label>
                    <input type="name" onChange={e => setAvatar(e.target.value)} class="form-control" value={avatar}/>
                </div>

                <button class="w-100 btn btn-lg btn-primary" type="submit">Изменить</button>
                <p class="mt-5 mb-3 text-muted"></p>
            </form>
        </div>
    )
}
