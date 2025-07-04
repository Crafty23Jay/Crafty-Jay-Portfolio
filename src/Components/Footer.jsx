import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Branding/About */}
        <div className="footer-section about">
          <h3>Crafty Jay</h3>
          <p>
            I’m a creative and passionate Web Developer & Graphic Designer committed to delivering clean and engaging experiences for users across the web.
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#hero">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section contact">
          <h4>Contact</h4>
          <p><i className="fas fa-phone-alt"></i> <a href="https://wa.me/2348084090236" target="_blank" rel="noreferrer">+234 808 409 0236</a></p>
          <p><i className="far fa-envelope"></i> <a href="mailto:alasatisaheedjamal@gmail.com">alasatisaheedjamal@gmail.com</a></p>
        </div>

        {/* Social Media */}
        <div className="footer-section social">
          <h4>Follow Me</h4>
          <div className="social-icons">
            <a href="https://github.com/Crafty23Jay" target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>
            <a href="https://wa.me/2348084090236" target="_blank" rel="noreferrer"><i className="fab fa-whatsapp"></i></a>
            <a href="mailto:alasatisaheedjamal@gmail.com" target="_blank" rel="noreferrer"><i className="far fa-envelope"></i></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><i className="fab fa-facebook"></i></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a>
            <a href="https://x.com/Crafty23Jay" target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a>
            <a href="https://tiktok.com/@jamalsaheed" target="_blank" rel="noreferrer"><i className="fab fa-tiktok"></i></a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Crafty Jay. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
