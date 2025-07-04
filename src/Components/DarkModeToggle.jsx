// src/components/DarkModeToggle.js
import React from 'react';
import './DarkModeToggle.css'

function DarkModeToggle({ toggle, dark }) {
  return (
    <button className="dark-toggle" onClick={toggle}>
      {dark ? '☀️' : '🌙'}
    </button>
  );
}

export default DarkModeToggle;