//Rebecca please don't try to put routes anywhere but here

import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import { HomePage,GameOver } from './gameServices'; // Ensure this is the correct path to the GameOver component
import { HistoryContextProvider } from './contextHelper.jsx';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HistoryContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<App />} />
        <Route path="/game-over" element={<GameOver />} />
      </Routes>
    </Router>
  </HistoryContextProvider>
);

