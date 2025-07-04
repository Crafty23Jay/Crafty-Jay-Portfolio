// src/App.js
import React, { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import FloatingChat from './Components/FloatingChat';
import Projects from './Components/Projects';
import DarkModeToggle from './Components/DarkModeToggle';
import About from './Components/About';
import Contact from './Components/Contact';
import Footer from './Components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <Navbar />
      <DarkModeToggle toggle={() => setDarkMode(!darkMode)} dark={darkMode}/>
      <Hero />
      <About />
      {/* <Projects /> */}
      <Contact />
      <Footer />
      <FloatingChat />
      
    </div>
  );
}

export default App;