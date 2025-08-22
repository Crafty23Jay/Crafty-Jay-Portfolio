import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace this with EmailJS or Formspree logic
    console.log('Form Submitted:', formData);
    alert('Thanks for reaching out! I’ll get back to you shortly.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <h2>Contact Me</h2>
        <p className="contact-intro">
          Feel free to message me if you need my service, have questions, or just want to connect. I’m always happy to hear from you!
        </p>

        <form className="contact-form" 
            action="https://formspree.io/f/xwpbdkzq"
            method="POST" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Gmail"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
          ></textarea>
          <button type="submit">Send Message</button>
        </form>

        <div className="contact-links">
          <p>Or reach me directly on:</p>
          <div className="icon-links">
            <a href="https://wa.me/2348084090236" target="_blank" rel="noreferrer">
              <i className="fab fa-whatsapp"></i> WhatsApp
            </a>
            <a href="mailto:alasatisaheedjamal@gmail.com" target="_blank" rel="noreferrer">
              <i className="far fa-envelope"></i> Gmail
            </a>
            <a href="https://github.com/Crafty23Jay" target="_blank" rel="noreferrer">
              <i className="fab fa-github"></i> GitHub
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook"></i> Facebook
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <i className="fab fa-linkedin"></i> LinkedIn
            </a>
            <a href="https://x.com/Crafty23Jay" target="_blank" rel="noreferrer">
              <i className="fab fa-twitter"></i> Twitter

            </a>
            <a href="https://tiktok.com/@jamalsaheed" target="_blank" rel="noreferrer">
              <i className="fab fa-tiktok"></i> TikTok
            </a>
          </div>
        </div>

        <p className="contact-outro">
          Thank you so much for reaching out. I’ll get back to you immediately!
        </p>
      </div>
    </section>
  );
}

export default Contact;
