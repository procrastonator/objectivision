import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = "http://localhost:5005";

export default function EditProject(props) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { projectId } = useParams();      
  const navigate = useNavigate();  

  useEffect(() => {                                  // <== ADD
    axios
      .get(`${API_URL}/api/projects/edit/${projectId}`)
      .then((response) => {
        /* 
          We update the state with the project data coming from the response.
          This way we set inputs to show the actual title and description of the project
        */
        const oneProject = response.data;
        setTitle(oneProject.title);
        setDescription(oneProject.description);
      })
      .catch((error) => console.log(error));
    
  }, [projectId]);

  const handleFormSubmit = (e) => {                     // <== ADD
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = { title, description };
 
    // Make a PUT request to update the project
    axios
      .put(`${API_URL}/api/projects/${projectId}`, requestBody)
      .then((response) => {
        props.updateProjects();
        navigate(`/projects/${projectId}`)
      });
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
    
    </div>
  )
}

// src/pages/EditProjectPage.js


