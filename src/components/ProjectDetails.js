import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';


export default function ProjectDetails() {

  const { Id } = useParams();
  const [projectDetails, setProjectDetails] = useState({undefined})

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/projects/${Id}`)
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
