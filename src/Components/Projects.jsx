// src/components/Projects.js
import React from 'react';
import './Projects.css';
// import { projects } from '../data/projects';


const Projects = () => {
  return (
    <section className="projects" id="projects">
      <h2>Projects</h2>
      <div className="project-grid">
        {Projects.map((proj, index) => (
          <div className="project-card" key={index}>
            <img src={proj.image} alt={proj.title} />
            <h3>{proj.title}</h3>
            <p>{proj.description}</p>
            <div className="project-links">
              <a href={proj.demo} target="_blank" rel="noreferrer">Live</a>
              <a href={proj.repo} target="_blank" rel="noreferrer">Code</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;