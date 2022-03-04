import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import {  useParams } from 'react-router-dom';

 
//use UseParams to grab the goalId [x]
//change your backend route --> grab the goalId with req.params in server side
// send the object with the new goal information to the backend
// use this object in your server side code to update the goal

export default function UpdateGoal(props) {

    const { goalId } = useParams(); 
    
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    
   

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const goalDetails ={title,description};

        axios.put(
            `${process.env.REACT_APP_API_URL}/goals/${goalId}/update`, goalDetails)
            .then((response) => {
              console.log(response);
              props.updateProjects();
              navigate(`/projects/${response.data.projectId}`);
            
              
              });
    }

    

    return (
        <div className="editGoal">
        <h1>Update Goal</h1>
  
         <form onSubmit={handleSubmit}>
  
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <br /><br />
  
          <label>
            Description:
            <textarea
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
  
          <button type="submit">Submit</button>
        </form> 
  
  
      </div>
  )
}