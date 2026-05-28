import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { UserProvider } from './context/UserProvider.jsx';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Enveloppement de la racine de l'application  */}
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);