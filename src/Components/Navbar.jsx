import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ isLoggedIn, profilePic }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggle = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      {/* Hamburger or Close icon (mobile only) */}
      <div className="hamburger-icon" onClick={handleToggle}>
        {sidebarOpen ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
      </div>

      {/* Desktop Navbar */}
      <nav className="navbar desktop-only">
        <div className="nav-brand">
          <Link to="">Crafty Jay</Link>
        </div>
        <ul className="nav-menu">
          <li><a href="#hero"><i className="fas fa-home"></i> Home</a></li>
          <li><a href="#about"><i className="fas fa-user"></i> About</a></li>
          <li><a href="#projects"><i className="fas fa-laptop-code"></i> Projects</a></li>
          <li><a href="#contact"><i className="fas fa-envelope"></i> Contact</a></li>
          {
            isLoggedIn ? (
              <li>
                <Link to="/admin">
                  <i className="fas fa-user-cog"></i> Profile
                  {profilePic && <img src={profilePic} alt="Profile" className="nav-avatar" />}
                </Link>
              </li>
            ) : (
              <li><Link to="/login"><i className="fas fa-sign-in-alt"></i> Login</Link></li>
            )
          }
        </ul>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-brand">Crafty Jay</span>
          {/* <button onClick={handleToggle}><i className="fas fa-times"></i></button> */}
        </div>
        <ul className="sidebar-menu">
          <li><a href="#hero" onClick={handleToggle}><i className="fas fa-home"></i> Home</a></li>
          <li><a href="#about" onClick={handleToggle}><i className="fas fa-user"></i> About</a></li>
          <li><a href="#projects" onClick={handleToggle}><i className="fas fa-laptop-code"></i> Projects</a></li>
          <li><a href="#contact" onClick={handleToggle}><i className="fas fa-envelope"></i> Contact</a></li>
          {
            isLoggedIn ? (
              <li onClick={handleToggle}>
                <Link to="/admin">
                  <i className="fas fa-user-cog"></i> Profile
                  {profilePic && <img src={profilePic} alt="Profile" className="nav-avatar" />}
                </Link>
              </li>
            ) : (
              <li onClick={handleToggle}><Link to="/login"><i className="fas fa-sign-in-alt"></i> Login</Link></li>
            )
          }
        </ul>
      </div>
    </>
  );
}

export default Navbar;
