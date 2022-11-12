import React from 'react';
import './App.css';
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
    <div className="wrapper">
      <h1>Application</h1>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/logout" element={<Logout />}/>
        </Routes>
      </Router>
    </div>
  );
}
