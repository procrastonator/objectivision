import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import "./ProjectDetails.css"


export default function ProjectDetails(props) {



  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState({ undefined })
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


        let newfilter = result.data.goals
        let newDoneArr = newfilter.filter(element => element.isDone === true)
        setIsDoneArr(newDoneArr)

        let newInProgressArr = newfilter.filter(element => element.isDone === false)
        setInProgress(newInProgressArr)

      })
      .catch();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const id = e.target.id;
    //setIsDone(true)
    // const goalDetails = true // True
    console.log("WE CLICKED 'DONE'");
    axios.put(
      `${process.env.REACT_APP_API_URL}/goals/${id}/update`, {isDone:true})
      .then((response) => {
        
        console.log(response.data.isDone);
        props.updateProjects();

    }).catch((error) => {
      console.log("Oops, we fucked up.");
      console.log(error);
    });};

    function handleSubmitNotDONE(e) {
      e.preventDefault();
      const id = e.target.id;
      console.log("We Clicked Not Done")
  
      axios.put(
        `${process.env.REACT_APP_API_URL}/goals/${id}/update`, {isDone:false}) // <- {} is your body!
        .then((response) => {
          console.log(response.data.isDone)
          props.updateProjects();
  
      })};

    
  

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
            <button id= {element._id} onClick={handleSubmitNotDONE}>
              I think I am not done
            </button>

          </div>
        )
      })}

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


            <button id= {element._id} onClick={handleSubmit}>
              Done
            </button>

          </div>
        )
      })}




    </div>
  )
}
