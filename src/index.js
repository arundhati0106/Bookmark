// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from './Context/appContext';
import { Provider } from 'react-redux'; // Import Redux Provider
import store from './Redux/store'; // Import your Redux store from the correct path

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <Provider store={store}> {/* Wrap with Redux Provider */}
          <App />
        </Provider>
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
