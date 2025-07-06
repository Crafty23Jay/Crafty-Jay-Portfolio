// src/pages/Profile.jsx

import React, { useState } from 'react';
import { auth } from '../Firebase';
import { updateProfile, signOut } from 'firebase/auth';
import './Profile.css';

function Profile({ user }) {
  const [newName, setNewName] = useState('');
  const [message, setMessage] = useState('');

  const handleChangeName = async () => {
    try {
      if (newName.trim() === '') return;
      await updateProfile(auth.currentUser, {
        displayName: newName
      });
      setMessage('Username updated successfully ✅');
    } catch (error) {
      setMessage('Failed to update name ❌');
      console.error(error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = '/';
  };

  return (
    <div className="profile-container">
      <h2>Welcome, {user.displayName || user.email}</h2>

      <div className="profile-section">
        <label htmlFor="username">Change Display Name:</label>
        <input
          type="text"
          id="username"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button onClick={handleChangeName}>Update Name</button>
      </div>

      {/* Future: Profile picture change */}
      <div className="profile-section">
        <p><strong>Email:</strong> {user.email}</p>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Profile;
