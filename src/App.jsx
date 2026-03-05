//import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router';
import ContactsPage from './pages/ContactsPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div>
      <h1>Rolodex</h1>
      <Routes>
        <Route path="/" element={<ContactsPage />}>
        </Route>
        <Route path="/about" element={<AboutPage />}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
