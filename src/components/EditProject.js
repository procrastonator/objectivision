import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom';


export default function EditProject(props) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { projectId } = useParams();      
  const navigate = useNavigate();  

  useEffect(() => {                                 
    axios
      .get(`${process.env.REACT_APP_API_URL}/projects/${projectId}`)
      .then((response) => {
      
        const oneProject = response.data;
        setTitle(oneProject.title);
        setDescription(oneProject.description);
      })
      .catch((error) => console.log(error));
    
  }, [projectId]);

  const handleFormSubmit = (e) => {                   
    e.preventDefault();
    
    const requestBody = { title, description };
 
   
    axios
      .put(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, requestBody)
      .then((response) => {
        props.updateProjects();
        navigate(`/projects/${projectId}`)
      });
  };

  const deleteProject = () => {                  
   
    axios
      .delete(`${process.env.REACT_APP_API_URL}/projects/${projectId}`)
      .then(() => {
        props.updateProjects();
        navigate("/projects");
      })
      .catch((err) => console.log(err));
  };  

  return (
    <div>
    
    EditProject
    <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input type="submit" value="Submit" />
      </form>

      <button onClick={deleteProject}>Delete Project</button>
    
    </div>
  )
}

// src/pages/EditProjectPage.js


