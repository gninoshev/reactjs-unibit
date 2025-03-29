import React, { useState, useEffect, useCallback } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ user, logoutUser }) => {
    const navigate = useNavigate();
    const [showQR, setShowQR] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(60);
    const [darkMode, setDarkMode] = useState(false); // Dark/Light mode toggle

    // Reset timer callback – resets inactivity timer on user activity.
    const resetTimer = useCallback(() => {
        setTimeRemaining(60);
    }, []);

    // Listen for activity events to reset the inactivity timer.
    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }
        const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
        events.forEach((event) => window.addEventListener(event, resetTimer));
        return () => {
            events.forEach((event) => window.removeEventListener(event, resetTimer));
        };
    }, [user, navigate, resetTimer]);

    // Inactivity auto-logout effect.
    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }
        const intervalId = setInterval(() => {
            setTimeRemaining((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(intervalId);
                    logoutUser();
                    navigate('/');
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [user, logoutUser, navigate]);

    // Toggle dark mode by adding/removing a class on the body.
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    if (!user) return null;

    // Prepare the QR code data.
    const qrData = JSON.stringify({
        username: user.username,
        email: user.email,
        userCode: user.userCode,
    });

    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                <h2>Welcome, {user.username}!</h2>
                <p>Here is your account information:</p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li><strong>Username:</strong> {user.username}</li>
                    <li><strong>Email:</strong> {user.email}</li>
                    <li><strong>User Code:</strong> {user.userCode}</li>
                </ul>
                <p>Auto-logout in: {timeRemaining} seconds (inactivity timer)</p>

                {/* Dark Mode Toggle */}
                <div style={{ marginBottom: '1rem' }}>
                    <button onClick={() => setDarkMode((prev) => !prev)}>
                        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    </button>
                </div>

                {/* Generate QR Code Button */}
                <div style={{ marginBottom: '1rem' }}>
                    <button onClick={() => setShowQR((prev) => !prev)}>
                        {showQR ? 'Hide QR Code' : 'Generate QR Code'}
                    </button>
                </div>

                {showQR && (
                    <div style={{ margin: '1rem 0' }}>
                        <QRCodeCanvas value={qrData} size={256} />
                    </div>
                )}

                {/* Logout Button */}
                <div style={{ marginTop: '1rem' }}>
                    <button
                        onClick={() => {
                            logoutUser();
                            navigate('/');
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
