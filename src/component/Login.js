import React, { useState } from 'react'
import './Login.css';
import PropTypes from 'prop-types'
import { SHA256, enc } from 'crypto-js';
import useToken from './useToken';

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
        <div className="login-wrapper">
            <h1>Вход</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Логин</p>
                    <input type="text" onChange={e => setLogin(e.target.value)} />
                </label>
                <br></br>
                <label>
                    <p>Пароль</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}