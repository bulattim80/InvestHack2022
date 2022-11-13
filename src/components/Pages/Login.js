import React, { useState } from 'react'
import './Login.css';
import PropTypes from 'prop-types'
import { SHA256, enc } from 'crypto-js';

async function loginUser(credentials) {
    credentials.password = SHA256(credentials.password).toString(enc.Hex);
    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials),
    };

    return fetch("https://hack.invest-open.ru/auth", requestOptions)
        .then(response => response.json());
}

export default function Login({ setToken }) {
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          login,
          password
        });
        setToken(token.jwtToken);
        window.location.href = '/';
      }

    return (
        <div class="login-wrapper mt-5">
            <form onSubmit={handleSubmit}>
                <h1 class="h3 mb-3 fw-normal pl-7 pr-7 text-center">Вход</h1>
                <div class="form-floating mb-3">
                    <label for="floatingInput">Логин</label>
                    <input type="Username" onChange={e => setLogin(e.target.value)} class="form-control"/>
                </div>
                <div class="form-floating mb-3">
                    <label for="floatingPassword">Пароль</label>
                    <input type="password" onChange={e => setPassword(e.target.value)} class="form-control"/>
                </div>

                <button class="w-100 btn btn-lg btn-primary" type="submit">Войти</button>
                <p class="mt-5 mb-3 text-muted"></p>
            </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}