import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';


export default function ProjectDetails() {

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
    <p>{projectDetails.description}</p>
    
    <Link to={`/projects/${projectId}/goal/new`}>
    <button>Add New Goal</button>
    </Link>

    <Link to={`/projects/${projectId}/edit`}>
    <button>Edit Project or Delete</button>
    </Link>

   
    
    </div>
  )
}
