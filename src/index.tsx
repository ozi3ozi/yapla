import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { worker } from './mocks';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Start a mock API server to handle auth requests
worker.start({
  onUnhandledRequest: 'bypass',
});
