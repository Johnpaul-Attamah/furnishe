import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import store from './store';
import App from './App';

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <HelmetProvider>
    <AlertProvider template={AlertTemplate}{...options}>
      <App />
    </AlertProvider>
    </HelmetProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
