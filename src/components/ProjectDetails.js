import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';


export default function ProjectDetails() {

  const { Id } = useParams();
  const [projectDetails, setProjectDetails] = useState({undefined})

  const { getToken } = useContext(AuthContext)

  const storedToken = getToken();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/projects/${Id}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
        )
      .then((result) => {
        console.log(result.data)
        setProjectDetails(result.data);
      })
      .catch();
  }, [Id]);

  return (
    <div className='ProjectDetails'>
    
    <h2>{projectDetails.title}</h2>
    <p>{projectDetails.description}</p>
    
    <Link to={`/projects/${projectDetails._id}/new-task`}>
    <button>New task</button>
    </Link>

    <Link to={`/projects/edit${Id}`}>
    <button>Edit Project</button>
    </Link>

   
    
    </div>
  )
}
