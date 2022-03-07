import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import "./ProjectDetails.css"


export default function ProjectDetails() {



  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState({undefined})
  const { getToken } = useContext(AuthContext)
  const storedToken = getToken();

  const [isDoneArr, setIsDoneArr] = useState([]);
  const [inProgress, setInProgress] = useState([]);


  useEffect(() => {
   
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/projects/${projectId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
        )
      .then((result) => {

        setProjectDetails(result.data)

        console.log(inProgress)
       
       
       let newfilter = result.data.goals
       let newDoneArr = newfilter.filter(element => element.isDone === true )
       setIsDoneArr(newDoneArr)


 
       let newInProgressArr = newfilter.filter(element => element.isDone === false )
       setInProgress(newInProgressArr)

        console.log(newDoneArr)
      })
      .catch();
  }, []);


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


     <h3> Is done </h3>
     {isDoneArr.map((element, index) => {
      return (
        <div key={element._id}>
        <hr />
       
        <p>Goals:</p>
        <div >
        <p> {element.title}</p>
        <p> {element.description}</p>
        </div>

        </div>
        )
    })   }

        <hr />
<h3> In Progress </h3>
  {inProgress.map((element, index) => {
      return (
        <div key={element._id}>
     
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
