import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const logoutUser = () => {
    setLoggedInUser(null);
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard user={loggedInUser} logoutUser={logoutUser} />} />
    </Routes>
  );
}

export default App;
