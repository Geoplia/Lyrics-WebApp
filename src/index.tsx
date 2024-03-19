import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Render the React application
ReactDOM.render(
  //Ενεργοποίηση του StrictMode του React για την επισήμανση πιθανών προβλημάτων
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  // Target DOM element where the React application will be rendered
  document.getElementById('root')
);
