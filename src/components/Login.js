import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setLoggedInUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`my-json-server-app.azurewebsites.net/users?username=${username}&password=${password}`);
            const data = await response.json();
            if (data && data.length > 0) {
                setLoggedInUser(data[0]);
                navigate('/dashboard');
            } else {
                setError('Invalid username or password');
            }
        } catch (err) {
            console.error('Error during login:', err);
            setError('Login error');
        }
    };

    return (
        <div className="app-container">
            <div className="form-container">
                <h2>Customer Portal Login</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <p className="link">
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
