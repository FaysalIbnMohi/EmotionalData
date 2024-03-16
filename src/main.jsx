import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import "react-datepicker/dist/react-datepicker.css";
import './index.css';


// Initialize languages
import './locales/i18n';
import { configureAppStore } from './store/configureStore';
import App from './App';

const store = configureAppStore();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
