import React from 'react';
import Home from './pages/Home';
import { Makeup } from './pages/Makeup';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DetailMakeup } from './pages/DetailMakeup';
import MakeupEvents from './pages/Events';
import PhotoSales from './pages/PhotoSales';
import MembershipPage from './pages/Membership';
import ModelDetails from './pages/DetailModel';
import Models from './pages/Models';

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
          <Route path='/membership' element={<MembershipPage/>} />
          <Route path='/models/:slug' element={<ModelDetails/>} />
          <Route path='/models' element={<Models/>} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
