import React from 'react';
import './About.css';

function About() {
  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-text">
          <h2>About Me</h2>
          <p>
            I’m Crafty Jay — a passionate <strong>web developer</strong> and <strong>graphic designer</strong> who brings ideas to life through clean code and creative visuals.
            I specialize in building responsive websites, branding, and user-centered design.
          </p>
          <p>
            With a strong background in both code and design, I bridge the gap between aesthetics and functionality.
            Whether it's building portfolios, e-commerce sites, or visual identities — I craft experiences that are both beautiful and effective.
          </p>
        </div>
        <div className="about-img">
          <img src="/images/home-form-bg.jpeg" alt="Crafty Jay" />
        </div>
      </div>
    </section>
  );
}

export default About;
