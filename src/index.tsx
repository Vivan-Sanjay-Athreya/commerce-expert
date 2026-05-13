import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from 'store';

import App from './App';
import './index.css';

// Suppress benign ResizeObserver loop errors from Chameleon web components
// These fire during layout calculations and don't affect functionality
const origError = window.onerror;
window.onerror = (message, ...args) => {
  if (typeof message === 'string' && message.includes('ResizeObserver loop')) return true;
  return origError ? origError(message, ...args) : false;
};

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');

createRoot(container).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
