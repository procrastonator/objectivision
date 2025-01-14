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
  const [toggleState, setToggleState] = useState(false);


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
      { isDone: true },
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
      .then((response) => {
        setToggleState(!toggleState)
        console.log(toggleState)
      }).catch((error) => {
        console.log("Oops, we fucked up.");
        console.log(error);
      });
  };

  function handleSubmitNotDONE(e) {
    e.preventDefault();
    const id = e.target.id;
    console.log("We Clicked Not Done")

    axios.put(
      `${process.env.REACT_APP_API_URL}/goals/${id}/update`,
      { isDone: false },
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
      .then((response) => {
        console.log("get Somthing", response)
        setToggleState(!toggleState)
      })
  };

  const goBack = () => {
    navigate(`/projects`)
  }


  return (
    <div className='ProjectDetails'>


      <h2>{projectDetails.title}</h2>
      {projectDetails.image
        ? <img className={"border"} src={projectDetails.image} alt="pictur" width="200" height="200" />
        : <img src={noImage} alt="no pic" width="200" height="200" />}

      <h4>Description:</h4>
      <p>{projectDetails.description}</p>

      <Link to={`/projects/${projectId}/goal`}>
        <button className='btn btn-warning buttonNew'>Add New Goal</button>
      </Link>

      <Link to={`/projects/${projectId}/edit`}>
        <button className='btn btn-warning buttonEdit'>Edit Project or Delete</button>
      </Link>
        <button onClick={goBack} class="btn btn-dark pBackButton2">Back</button>
    


   <div className='.contain'>
    <div class="container px-4">
        <div class="row gx-5">
          <div class="col Size">
            <div class="p-3 border InProgress"><h3> In Progress: </h3>
              {inProgress.length === 0 ?<>
                <p>Looks like you have no goals</p>
                <Link to={`/projects/${projectId}/goal`}>
                   <button className='btn btn-warning black-border'>Add New Goal</button>
                  </Link>
              </>
              
                
                : inProgress.map((element, index) => {
                return (
                  <div key={element._id}>
                    <hr />

                    <h4>Goals:</h4>
                    <div >
                      <h5>Title: {element.title}</h5>
                      <p>Description: {element.description}</p>
                      <a href={element.link} target="{_blank}">{element.link}   </a>
                    </div>

                    <Link to={`/projects/${element._id}/update`}>
                      <button className='btn btn-secondary space-btn'>update Goal</button>
                    </Link>


                    <button id={element._id} onClick={handleSubmit} className="btn btn-success">
                      Done
                    </button>

                  </div>
                )
              })}</div>
          </div>
          <div class="col">
            <div class="p-3 border Done"><h3> Is Done: </h3>
              {isDoneArr.length === 0 ? <p>Looks like you have no goals finished yet</p>
                :isDoneArr.map((element, index) => {
                return (
                  <div key={element._id}>
                    <hr />

                    <h4>Goals:</h4>
                    <div >
                      <h5>Title:{element.title}</h5>
                      <p>Description:{element.description}</p>

                    </div>
                    <button id={element._id} onClick={handleSubmitNotDONE} className="btn btn-warning">
                      I think I am not done
                    </button>

                  </div>
                )
              })}</div>
          </div>
        </div>
      </div>
</div>


    
    </div>
  )
}


