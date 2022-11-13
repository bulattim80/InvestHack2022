import { React, useEffect, useState } from 'react';
import './App.css';
import Chat from './components/Pages/Chat';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Login from './components/Pages/Login';
import Logout from './components/Pages/Logout';
import Profile from './components/Pages/Profile';
import NoPage from './components/Pages/NoPage';
import StockGraph from './components/Widgets/Graphs/StockGraph';

export default function App() {
  document.title = "Hack&Change 2022";
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    setLoading(true);
    if (!token) {
      setError(true);
      setLoading(false);
      return;
    }
    fetch("https://hack.invest-open.ru/jwt/verify", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          jwt: token
        }),
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw response;
      })
      .then(json => {
        setData(json);
      })
      .catch(error => {
        console.log('error', error);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [])

  if (loading) return <div> loading... </div>;
  if (error) return <Login setToken={
    (userToken) => {
      localStorage.setItem('jwtToken', userToken)
    }} />
  sessionStorage.setItem('userId', data.userId);
  sessionStorage.setItem('role', data.role);
  return (
    
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </div>
      </Router>
  );
}

