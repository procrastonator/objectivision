import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
// import { GoalContext } from '../context/finishedGoal.context';
import "./ProjectDetails.css"


export default function ProjectDetails() {

  // const { status, toggleStatus } = useContext(GoalContext) 

  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState({undefined})
  const { getToken } = useContext(AuthContext)
  const storedToken = getToken();

  const [isDoneArr, setIsDoneArr] = useState([]);
  const [inProgress, setInProgress] = useState([]);


  // const checkProgressStatus = () => {
  //   if (result.data.goals.isDone === "true") {
      
  //   }
  // }   

  // we need to figure out that the user see a colu with in progress goals and and is done colum.
  // we would write a functon that will do a if statment that: 
  

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/projects/${projectId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
        )
      .then((result) => {
        setProjectDetails(result.data)
        for ( let i = 0 ; i < result.data.goals.length; i++){
        if (result.data.goals[i].isDone === true) {
          setIsDoneArr(isDoneArr.push(result.data.goals[i]))
          console.log(isDoneArr)
        } else {
          setInProgress(inProgress.push(result.data.goals[i]))
          console.log(inProgress)
        }
      }

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


    { isDoneArr._id ===  undefined ?
     <h1>Loading....</h1> :
     isDoneArr.map((element, index) => {
      return (
        <div key={element._id}>
        <hr />

        <p>Goals:</p>
        <div >
        <p> {element.title}</p>
        <p> {element.description}</p>

      
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
