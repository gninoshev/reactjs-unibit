import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ addUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const validatePassword = (pwd) => {
        // Must be at least 8 characters with one letter and one number
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
        return regex.test(pwd);
    };

    const generateUserCode = () => {
        // Generate a random 8-digit code
        return Math.floor(10000000 + Math.random() * 90000000).toString();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters long and contain at least one letter and one number.');
            return;
        }
        const userCode = generateUserCode();
        const newUser = { username, password, email, userCode };
        addUser(newUser);
        navigate('/');
    };

    return (
        <div className="app-container">
            <div className="form-container">
                <h2>Register</h2>
                {passwordError && <p className="error">{passwordError}</p>}
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
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
