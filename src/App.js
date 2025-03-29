import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  // Store users as an array of objects { username, email, password, userCode }
  const [users, setUsers] = useState([]);
  // Track the current logged-in user
  const [loggedInUser, setLoggedInUser] = useState(null);

  const addUser = (user) => {
    setUsers(prevUsers => [...prevUsers, user]);
  };

  const loginUser = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setLoggedInUser(user);
      return true;
    }
    return false;
  };

  const logoutUser = () => {
    setLoggedInUser(null);
  };

  return (
      <div>
        <Routes>
          <Route path="/" element={<Login loginUser={loginUser} />} />
          <Route path="/register" element={<Register addUser={addUser} />} />
          <Route path="/dashboard" element={<Dashboard user={loggedInUser} logoutUser={logoutUser} />} />
        </Routes>
      </div>
  );
}

export default App;
