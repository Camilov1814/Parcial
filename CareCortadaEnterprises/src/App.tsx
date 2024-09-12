import React from 'react';
import Home from './pages/Home';
import { Makeup } from './pages/Makeup';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DetailMakeup } from './pages/DetailMakeup';
import MakeupEvents from './pages/Events';
import PhotoSales from './pages/PhotoSales';

function App() {
  return (
    <div className="bg-backgroundMain min-h-screen font-sans"> {/* Aplica el fondo y otras clases aquí */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/makeup" element={<Makeup />} />
          <Route path="/makeup/:slug" element={<DetailMakeup />} />
          <Route path="/events" element={<MakeupEvents />} />
          <Route path='/photos' element={<PhotoSales/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
