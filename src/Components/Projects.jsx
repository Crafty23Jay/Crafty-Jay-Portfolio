import React, { useEffect, useState } from 'react';
import './Projects.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase'; // Make sure db is exported from your Firebase config

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(projectData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="projects" id="projects">
      <h2>Projects</h2>
      {loading ? (
        <p className="loading">Loading projects...</p>
      ) : (
        <div className="project-grid">
          {projects.map((proj) => (
            <div className="project-card" key={proj.id}>
              <img src={proj.image} alt={proj.title} />
              <h3>{proj.title}</h3>
              <p>{proj.description}</p>
              <div className="project-links">
                {proj.demo && (
                  <a href={proj.demo} target="_blank" rel="noreferrer">
                    Live
                  </a>
                )}
                {proj.repo && (
                  <a href={proj.repo} target="_blank" rel="noreferrer">
                    Code
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Projects;
