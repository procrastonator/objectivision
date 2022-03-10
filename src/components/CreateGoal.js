import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { AuthContext } from "../context/auth.context"
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
// import { useNavigate } from 'react-router';


export default function CreateGoal(props) {

  const { projectId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const { getToken } = useContext(AuthContext)

  const navigate = useNavigate();

  
  const handleSubmit = (e) => {
    e.preventDefault();
  // Create an object representing the body of the POST request
  const requestBody = { title, description,link, projectId };
  console.log(requestBody)
 
  const storedToken = getToken();
    axios
      .post(`${process.env.REACT_APP_API_URL}/goals/`, requestBody,
      { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        // Reset the state to clear the inputs
        console.log(response)
        setTitle("");
        setDescription("");
        setLink("")
        props.updateProjects();
        navigate("/projects");
        
      })
      .catch((error) => console.log(error));
  };

  const goBack = () => {
    navigate(`/projects/${projectId}`)
  }
  
  return (
    <div className="AddGoal">
      <h3>Add New Goal</h3>

      
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
 
        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <p>Add your url Link here</p>
        <label> Link:</label>
        <textarea
          type="text"
          name="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
     
 
        <button type="submit">Add Goal</button>
      </form>


      <button onClick={goBack}>Back</button>
      
    </div>
  );
}