import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validatePassword = (pwd) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
        return regex.test(pwd);
    };

    const generateUserCode = () => {
        // Generate a random 8-digit code.
        return Math.floor(10000000 + Math.random() * 90000000).toString();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters long and contain at least one letter and one number.');
            return;
        }
        const userCode = generateUserCode();
        const newUser = { username, password, email, userCode };

        try {
            const response = await fetch('https://my-json-server-app.azurewebsites.net/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });
            if (response.ok) {
                navigate('/');
            } else {
                setError('Registration failed.');
            }
        } catch (err) {
            console.error('Error during registration:', err);
            setError('Registration error');
        }
    };

    const rowStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1rem',
    };

    const labelStyle = {
        width: '120px',
        marginRight: '1rem',
        textAlign: 'right',
    };

    const inputStyle = {
        flex: 1,
        padding: '0.5rem',
        fontSize: '1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
    };

    return (
        <div className="app-container">
            <div className="form-container">
                <h2>Register</h2>
                {passwordError && <p className="error">{passwordError}</p>}
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div style={rowStyle}>
                        <label style={labelStyle}>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={inputStyle}
                            required
                        />
                    </div>
                    <div style={rowStyle}>
                        <label style={labelStyle}>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={inputStyle}
                            required
                        />
                    </div>
                    <div style={rowStyle}>
                        <label style={labelStyle}>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={inputStyle}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            padding: '0.75rem 1.5rem',
                            fontSize: '1rem',
                            background: 'var(--primary-color)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            transition: 'background 0.3s ease, transform 0.2s ease',
                        }}
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
