// src/components/Hero.js
import React from 'react';
import './Hero.css'
import logo from '/tab-icon.png';

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <img src={logo} className='logo-img' alt="Logo-img" />
        <h1 className="hero-title">Hi, I'm Crafty Jay</h1>
        <p className="hero-subtitle">Web Developer & Graphic Designer</p>
        <a href="#projects" className="hero-btn">View My Work</a>
      </div>
    </section>
  );
}

export default Hero;