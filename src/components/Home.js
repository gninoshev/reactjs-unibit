// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const Home = () => {
  const { data: users, loading, error } = useFetch('https://my-json-server-app.azurewebsites.net/users');

  return (
      <div className="home-page">
        <header className="navbar">
          <div className="navbar-container">
            <h1 className="logo">
              <Link to="/">My Website</Link>
            </h1>
            <nav>
              <ul className="nav-links">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="main-content">
          <div className="content-wrapper">
            <h2>Welcome to Our Website</h2>
            <p>Below is dynamic data fetched from our database:</p>
            {loading && <p>Loading data...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && users && (
                <ul>
                  {users.map((user) => (
                      <li key={user.id}>
                        {user.username} – {user.email}
                      </li>
                  ))}
                </ul>
            )}
          </div>
        </main>
      </div>
  );
};

export default Home;
