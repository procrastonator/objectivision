import { Link } from "react-router-dom";
import begin from "./assets/ideas.jpeg"
import "./ProjectList.css"
import star from "./assets/star-outline.svg"
import { useEffect } from "react";
import list from "./assets/projectListPic.jpeg"

export default function ProjectsList(props) {
  const { projectData } = props;
  const {updateProjects} = props

  // console.log(props)
  useEffect(()=>{
    updateProjects()
  }, [])

 
  if (!projectData){
    return <h1>Loading...</h1>
  }
  return (
    <div>
      {projectData.length === 0 ? (
        <div className="Box">
          <h3>I see you have no project. Why don't we get started on a new Project?</h3>
          <img className="corners" src={begin} alt="no pic" width="300" height="300" />
          <Link
            className=" btn btn-success button"
            aria-current="page"
            to="/projects/create"
          >
            New Project?
          </Link>
        </div>
      ) : (
       
        <div className="Contain">
     
        <img className="corners" src={list} alt="no pic" width="500" height="400" />
        
        <div className="boxing">
          {projectData.map((element, index) => {
            return (
              <div key={element._id}>
                <br />
                <section className="project-summary">
                
                  <Link className="btn btn-warning" to={`/projects/${element._id}`}>{element.title}
                  <img className="star" src={star} alt="no star" width="20" height="20" />
                  </Link>
                  
                  <p> This project has  {element.goals.length} goals </p>
                </section>
             
              </div>
            );
          })}
          </div>
        </div>
  
      )}
    </div>
  );
}
