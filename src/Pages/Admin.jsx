// src/pages/Admin.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import { db } from '../Firebase';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore';
import './Admin.css';

function Admin() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [demo, setDemo] = useState('');
  const [repo, setRepo] = useState('');
  const [image, setImage] = useState('');
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState('');

  const projectCollection = collection(db, 'projects');

  const navigate = useNavigate();

useEffect(() => {
  const user = auth.currentUser;

  // Replace with YOUR Gmail
  const allowedEmail = 'alasatisaheedjamal@gmail.com';

  if (!user || user.email !== allowedEmail) {
    navigate('/login'); // Redirect if not you
  }
}, []);


  const fetchProjects = async () => {
    const data = await getDocs(projectCollection);
    setProjects(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !demo || !repo || !image) return;

    await addDoc(projectCollection, {
      title,
      description,
      demo,
      repo,
      image,
    });

    setTitle('');
    setDescription('');
    setDemo('');
    setRepo('');
    setImage('');
    setMessage('✅ Project uploaded successfully!');
    fetchProjects();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'projects', id));
    setMessage('🗑️ Project deleted');
    fetchProjects();
  };

  return (
    <div className="admin-container">
      <h2>Admin Project Upload</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Short Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="url"
          placeholder="Live Demo Link"
          value={demo}
          onChange={(e) => setDemo(e.target.value)}
        />
        <input
          type="url"
          placeholder="Repository Link"
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
        />
        <input
          type="url"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit">Upload Project</button>
      </form>

      {message && <p className="admin-message">{message}</p>}

      <div className="project-list">
        {projects.map((proj) => (
          <div key={proj.id} className="project-card">
            <img src={proj.image} alt={proj.title} />
            <h3>{proj.title}</h3>
            <p>{proj.description}</p>
            <div className="links">
              <a href={proj.demo} target="_blank" rel="noreferrer">Live</a>
              <a href={proj.repo} target="_blank" rel="noreferrer">Code</a>
            </div>
            <button onClick={() => handleDelete(proj.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
