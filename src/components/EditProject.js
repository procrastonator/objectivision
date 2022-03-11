import React, { useContext } from 'react'
import { useState, useEffect } from "react";
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import "./EditProject.css"


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

  const goBack = () => {
    navigate(`/projects/${projectId}`)
  }

  return (
    <div>
    <h3>EditProject</h3>
    <form onSubmit={handleFormSubmit}>
      <div className='setTitle'>
      <div>
        <label>Title:</label>
      </div>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className='setDescription'>
        <div>
        <label>Description:</label>
        </div>
        <textarea rows="4" cols="50"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        </div>
        <div className='setPicture'>
        <div></div>
        <label>
          Picture (add url): 
          <br/>
          <input
            type="text"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        </div>
      <div className='submit'>
        <button type="submit" value="Submit" className='btn btn-success'>Submit</button>
      </div>
      </form>

     
      <button className='deleteProject btn btn-danger' onClick={deleteProject}>Delete Project</button>
      <button className='back btn btn-dark' onClick={goBack}>Back</button>
      
     
    
    </div>
  )
}

// src/pages/EditProjectPage.js


