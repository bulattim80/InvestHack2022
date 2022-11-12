import React from 'react';
import './App.css';
import Chat from './components/Chat';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Home from './component/Home';
import Login from './component/Login';
import Logout from './component/Logout';
import useToken from './component/useToken';

async function verifyToken(token) {
  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(),
  };

  return await fetch("https://hack.invest-open.ru/jwt/verify", requestOptions)
    .then(response => {
      console.log(response.json());
      response.json();
    })
    .catch(error => console.log('error', error));
}

export default function App() {
  const { token, setToken } = useToken();
  if (!token) {
    // console.log(verifyToken(token.jwtToken));
    return <Login setToken={setToken} />
  }
  return (
    <div>
      <Chat />
    </div>
  );
}
