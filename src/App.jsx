// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase';

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
import Profile from './Pages/Profile'; // You’ll build this later

function AppContent({ darkMode, setDarkMode, user }) {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      {/* Show Navbar and Toggle only when not on login page */}
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
              <Contact />
              <Footer />
              <FloatingChat />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={user?.email === "alasatisaheedjamal@gmail.com" ? <Admin /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsub();
  }, []);

  return (
    <Router>
      <AppContent darkMode={darkMode} setDarkMode={setDarkMode} user={user} />
    </Router>
  );
}

export default App;
