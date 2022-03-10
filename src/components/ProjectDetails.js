import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import "./ProjectDetails.css"
import noImage from "./assets/To-do-Note.png"
import { useNavigate } from 'react-router-dom';



export default function ProjectDetails(props) {

  const navigate = useNavigate();
  
  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState({ undefined })
  const { getToken } = useContext(AuthContext)
  const storedToken = getToken();
  const [isDoneArr, setIsDoneArr] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [toggleState, setToogleState] = useState (false);


  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/projects/${projectId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((result) => {
        // console.log(result.data)
        setProjectDetails(result.data)

        let newfilter = result.data.goals
        let newDoneArr = newfilter.filter(element => element.isDone === true)

        setIsDoneArr(newDoneArr)
        let newInProgressArr = newfilter.filter(element => element.isDone === false)
        setInProgress(newInProgressArr)

      })
      .catch();
  }, [toggleState]);

  

  function handleSubmit(e) {
    e.preventDefault();
    const id = e.target.id;
    //setIsDone(true)
    // const goalDetails = true // True
    console.log("WE CLICKED 'DONE'");
    axios.put(
      `${process.env.REACT_APP_API_URL}/goals/${id}/update`, 
      {isDone:true},
      { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        setToogleState(!toggleState)
        console.log(toggleState)
    }).catch((error) => {
      console.log("Oops, we fucked up.");
      console.log(error);
    });};

    function handleSubmitNotDONE(e) {
      e.preventDefault();
      const id = e.target.id;
      console.log("We Clicked Not Done")
  
      axios.put(
        `${process.env.REACT_APP_API_URL}/goals/${id}/update`, 
        {isDone:false},
        { headers: { Authorization: `Bearer ${storedToken}` } }
        )
        .then((response) => {
          console.log("get Somthing", response)
          setToogleState(!toggleState)
      })};

      const goBack = () => {
        navigate(`/projects`)
    }
  

  return (
    <div className='ProjectDetails'>


      <h2>{projectDetails.title}</h2>
      
      {projectDetails.image
          ? <img src={projectDetails.image} alt="pictur" width="200" height="200" />
          : <img src={noImage} alt="no pic" width="200" height="200" /> }

      <h4>Description:</h4>
      <p>{projectDetails.description}</p>

      <Link to={`/projects/${projectId}/goal`}>
        <button>Add New Goal</button>
      </Link>

      <Link to={`/projects/${projectId}/edit`}>
        <button>Edit Project or Delete</button>
      </Link>

      <div>
      <button onClick={goBack}>Back</button>
      </div>

      <h3> Is Done: </h3>
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
      <h3> In Progress: </h3>
      {inProgress.map((element, index) => {
        return (
          <div key={element._id}>

            <p>Goals:</p>
            <div >
              <p> {element.title}</p>
              <p> {element.description}</p>

             

              <a href={element.link} target="{_blank}">{element.link}   </a>
              

           
              
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
