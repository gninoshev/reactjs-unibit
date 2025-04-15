// src/App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PhotoGallery from './components/PhotoGallery';

function App() {
    const [loggedInUser, setLoggedInUser] = useState(null);

    const logoutUser = () => setLoggedInUser(null);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard user={loggedInUser} logoutUser={logoutUser} />} />
            <Route path="/gallery" element={<PhotoGallery />} />
        </Routes>
    );
}

export default App;
