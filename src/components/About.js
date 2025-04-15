import React from 'react';
import useFetch from '../hooks/useFetch';

const About = () => {
  const { data: users, loading, error } = useFetch('https://my-json-server-app.azurewebsites.net/users');
  
  const userCount = users ? users.length : 0;

  const packages = [
    { name: 'react', version: '^19.1.0' },
    { name: 'react-dom', version: '^19.1.0' },
    { name: 'react-router-dom', version: '^6.30.0' },
    { name: 'react-scripts', version: '5.0.1' },
    { name: 'qrcode.react', version: '^4.2.0' },
    { name: 'web-vitals', version: '^2.1.4' },
    { name: 'react-flip-toolkit', version: '^7.0.1' }
  ];

  return (
    <div className="app-container">
      <div className="form-container">
        <h2>About This Application</h2>
        <p>
          This application serves as a customer portal with several features:
          registration and login functionalities, a dynamic dashboard displaying user information,
          and a photo gallery with animated transitions. The project is built with React and uses a
          JSON/REST API (powered by JSON Server) to manage and retrieve user data.
        </p>
        
        <h3>Used Packages</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: 'var(--primary-color)', color: 'white' }}>Package</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: 'var(--primary-color)', color: 'white' }}>Version</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{pkg.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{pkg.version}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <h3>JSON Server Info</h3>
        {loading && <p>Loading JSON Server info...</p>}
        {error && <p className="error">Error loading JSON Server info: {error}</p>}
        {!loading && !error && (
          <p>
            The JSON Server currently has <strong>{userCount}</strong> user record{userCount !== 1 ? 's' : ''}.
          </p>
        )}
      </div>
    </div>
  );
};

export default About;
