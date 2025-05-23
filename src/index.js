import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
    <BrowserRouter basename="/reactjs-unibit">
        <App />
    </BrowserRouter>
);
