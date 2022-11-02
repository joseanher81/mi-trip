import React from 'react';
import ReactDOM from 'react-dom/client';
import { MiTripApp } from './MiTripApp';
import './styles.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MiTripApp />
  </React.StrictMode>
);