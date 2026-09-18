import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GameSetProvider } from './context/GameSetContext';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GameSetProvider>
      <App />
    </GameSetProvider>
  </React.StrictMode>
);
