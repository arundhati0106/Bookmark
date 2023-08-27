import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from './Context/appContext';
import { Provider } from 'react-redux';
import store from './Redux/store';

// Use createRoot instead of ReactDOM.render
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
