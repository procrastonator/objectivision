import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {  useParams } from 'react-router-dom';

 
//use UseParams to grab the goalId [x]
//change your backend route --> grab the goalId with req.params in server side
// send the object with the new goal information to the backend
// use this object in your server side code to update the goal

export default function UpdateGoal(props) {

    const { goalId } = useParams(); 
    // console.log(goalId)

    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    
    useEffect(() => {                                 
      console.log(goalId)
    axios
      .get(`${process.env.REACT_APP_API_URL}/goals/${goalId}`)
      .then((response) => {
        const oneProject = response.data;
        setTitle(oneProject.title);
        setDescription(oneProject.description);
      
    
      })
      .catch((error) => console.log(error));
    
    

  }, []);



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
