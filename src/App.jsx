// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';

import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import FloatingChat from './Components/FloatingChat';
import Projects from './Components/Projects';
import DarkModeToggle from './Components/DarkModeToggle';
import About from './Components/About';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import Login from './Pages/Login';
import Admin from './Pages/Admin';
import Profile from './Pages/Profile';
import Gallery from './Components/Gallery';
import GalleryUpload from './Components/GalleryUpload';
import Carousel from './Components/Carousel';

// 🔒 Custom Hook to get user from localStorage
const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('portfolioUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return user;
};

function AppContent({ darkMode, setDarkMode }) {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const user = useAuth();

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      {!isLoginPage && (
        <>
          <Navbar user={user} />
          <DarkModeToggle toggle={() => setDarkMode(!darkMode)} dark={darkMode} />
        </>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <Projects />
              <Gallery />
              <Carousel />
              <Contact />
              <Footer />
              <FloatingChat />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={user?.email === 'alasatisaheedjamal@gmail.com' || user?.email === 'crafty23jay@gmail.com' ? <Admin /> : <Navigate to="/login" />}
        />
        <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/login" />} />
        <Route path="/upload-gallery" element={user ? <GalleryUpload /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <AppContent darkMode={darkMode} setDarkMode={setDarkMode} />
    </Router>
  );
}

export default App;
