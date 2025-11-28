import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@/app/App'; // Import the configured App

// Locate the mounting point in index.html
const rootElement = document.getElementById('root');

if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}