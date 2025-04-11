import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const Home = () => {
  // Replace with your deployed JSON Server endpoint
  const { data: users, loading, error } = useFetch('https://my-json-server-app.azurewebsites.net/users');

  return (
    <div>
      {/* Navigation Bar */}
      <nav style={{ padding: "1rem", background: "#4a90e2", color: "white" }}>
        <ul style={{ display: "flex", listStyle: "none", margin: 0, padding: 0 }}>
          <li style={{ marginRight: "1rem" }}>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
          </li>
          <li style={{ marginRight: "1rem" }}>
            <Link to="/login" style={{ color: "white", textDecoration: "none" }}>Login</Link>
          </li>
          <li>
            <Link to="/register" style={{ color: "white", textDecoration: "none" }}>Register</Link>
          </li>
        </ul>
      </nav>

      {/* Main Body */}
      <main style={{ padding: "1rem" }}>
        <h1>Welcome to Our Website</h1>
        <p>Below is dynamic data fetched from our database:</p>
        {loading && <p>Loading data...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && users && (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.username} – {user.email}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default Home;
