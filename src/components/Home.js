import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import CoolAnimation from './CoolAnimation';

const Home = () => {
  const { data: users, loading, error } = useFetch('https://my-json-server-app.azurewebsites.net/users');

  return (
      <div className="home-page" style={{ position: 'relative', minHeight: '100vh' }}>
        <header className="navbar">
          <div className="navbar-container">
            <h1 className="logo">
              <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>My Website</Link>
            </h1>
            <nav>
              <ul className="nav-links">
                <li>
                  <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
                </li>
                <li>
                  <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>Login</Link>
                </li>
                <li>
                  <Link to="/register" style={{ textDecoration: 'none', color: 'white' }}>Register</Link>
                </li>
                <li>
                  <Link to="/gallery" style={{ textDecoration: 'none', color: 'white' }}>Gallery</Link>
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
        <CoolAnimation />
      </div>
  );
};

export default Home;
