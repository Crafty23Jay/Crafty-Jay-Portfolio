// src/components/Hero.js
import React from 'react';
import './Hero.css'

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <h1 className="hero-title">Hi, I'm Crafty Jay</h1>
        <p className="hero-subtitle">Web Developer & Graphic Designer</p>
        <a href="#projects" className="hero-btn">View My Work</a>
      </div>
    </section>
  );
}

export default Hero;