import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { GoalContext } from '../context/finishedGoal.context';
import "./ProjectDetails.css"


export default function ProjectDetails() {

  const { status, toggleStatus } =useContext(GoalContext) 
  console.log(status);
  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState({undefined})


  const { getToken } = useContext(AuthContext)

  const storedToken = getToken();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/projects/${projectId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
        )
      .then((result) => {
        console.log(result.data)
        setProjectDetails(result.data);
      })
      .catch();
  }, [projectId]);



  return (
    <div className='ProjectDetails'>
    
    
    <h2>{projectDetails.title}</h2>
    <h4>description</h4>
    <p>{projectDetails.description}</p>

    <Link to={`/projects/${projectId}/goal`}>
    <button>Add New Goal</button>
    </Link>

    <Link to={`/projects/${projectId}/edit`}>
    <button>Edit Project or Delete</button>
    </Link>


    { projectDetails._id ===  undefined ?
     <h1>Loading....</h1> :
     projectDetails.goals.map((element, index) => {
      return (
        <div key={element._id}>
        {console.log(projectDetails)}
        <hr />

        <p>Goals:</p>
        <div className={`UpdateGoal ${status}`}>
        <p> {element.title}</p>
        <p> {element.description}</p>
        <button onClick={toggleStatus}>
        {status === "inProgress" ? "Finished" : "Not finsihed"}
      
        </button>
        </div>
  
        <Link to={`/projects/${element._id}/update`}>
        <button>update Goal</button>
        </Link>
        

        </div>
        )
    })   }
   
  
    
    
   
    
    </div>
  )
}
