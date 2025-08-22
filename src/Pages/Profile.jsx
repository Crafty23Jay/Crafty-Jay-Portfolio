// src/Pages/Profile.jsx
import React, { useState } from 'react';
import './Profile.css';
import Projects from '../Components/Projects';
import GalleryUpload from '../Components/GalleryUpload';
import { signOut } from 'firebase/auth';

function Profile({ user }) {
  const [activeTab, setActiveTab] = useState('projects');

  const handleLogout = () => {
    signOut(auth);
    window.location.href = '/';
  };

  return (
    <div className="profile-page">
      <div className="cover-photo">
        <div className="profile-info">
          <img
            src={user.photoURL || '/default-avatar.png'}
            alt="Profile"
            className="profile-img"
          />
          <div>
            <h2>{user.displayName || 'Crafty Jay'}</h2>
            <p>{user.email}</p>
          </div>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>

      <div className="profile-body">
        <aside className="profile-sidebar">
          <button
            className={activeTab === 'projects' ? 'active' : ''}
            onClick={() => setActiveTab('projects')}
          >
            <i className="fas fa-folder"></i> Projects
          </button>
          <button
            className={activeTab === 'gallery' ? 'active' : ''}
            onClick={() => setActiveTab('gallery')}
          >
            <i className="fas fa-images"></i> Gallery
          </button>
          <button
            className={activeTab === 'settings' ? 'active' : ''}
            onClick={() => setActiveTab('settings')}
          >
            <i className="fas fa-cog"></i> Settings
          </button>
        </aside>

        <section className="profile-content">
          {activeTab === 'projects' && <Projects />}
          {activeTab === 'gallery' && <GalleryUpload />}
          {activeTab === 'settings' && (
            <div className="settings-tab">
              <h3>Account Settings</h3>
              <p>Feature coming soon: Change username & profile picture</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Profile;
