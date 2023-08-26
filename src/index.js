import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import AppContextProvider from './Context/appContext';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter> 
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
