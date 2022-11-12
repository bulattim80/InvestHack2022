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

  return fetch("https://hack.invest-open.ru/jwt/verify", requestOptions)
      .then(response => response.json());
}

export default function App() {
  const { token, setToken } = useToken();
  console.log(token);
  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
    <div>
          <Chat />
    </div>
  );
}
