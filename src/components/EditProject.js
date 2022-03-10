import React, { useContext } from 'react'
import { useState, useEffect } from "react";
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';


export default function EditProject(props) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const { projectId } = useParams();   
  const { getToken } = useContext(AuthContext)   
  const navigate = useNavigate();  
  const storedToken = getToken();

  useEffect(() => {  
    
    axios
      .get(`${process.env.REACT_APP_API_URL}/projects/${projectId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
        )
      
      .then((response) => {
      
        const oneProject = response.data;
        setTitle(oneProject.title);
        setDescription(oneProject.description);
        setImage(oneProject.image);
      })
      .catch((error) => console.log(error));
    
  }, [projectId]);

  const handleFormSubmit = (e) => {                   
    e.preventDefault();
    
    const requestBody = { title, description, image };
 
   
    axios
      .put(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, requestBody,
      { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        props.updateProjects();
        navigate(`/projects/${projectId}`)
      });
  };

  const deleteProject = () => {                  
   
    axios
      .delete(`${process.env.REACT_APP_API_URL}/projects/${projectId}`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
      )
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
        <input
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>
          Picture: (add url)
          <input
            type="text"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        

        <input type="submit" value="Submit" />
      </form>

      <button onClick={deleteProject}>Delete Project</button>
    
    </div>
  )
}

// src/pages/EditProjectPage.js


