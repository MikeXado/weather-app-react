
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import './App.scss';
import App from './App';
import {BrowserRouter , HashRouter} from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
    <HashRouter>
    <App />
    </HashRouter>
    </React.StrictMode>,
);
