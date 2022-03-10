import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../context/auth.context";
import "./HomePage.css"
import Register from "./assets/getting-it-done.jpeg"
import login from "./assets/Login-postit.webp"
import project from "./assets/to-do-projects.webp"
import newProject from "./assets/new-project.jpeg"




export default function HomePage(props) {

    const projectData = props

    const {isLoggedIn, user, logOutUser } = useContext(AuthContext);
    // function randomId(e) {
    //   e.preventDefault();
    //   const id = e.target.id
    // }
    // let randomId = Math.floor(Math.random()*projectData._id.length)
    // console.log(projectData)
    // console.log(randomId)
  
  return (
    <div>
    

    { !isLoggedIn &&
    <div className="HomepageBackground">
    <div className="center">
    <div classname="title">
  
</div>
    <h1>Project Vision</h1>
    <h2> A place to get your Project and Goals in order</h2>
    </div>
      <div className="container" >
    <div > 
    <NavLink to="/signup">
    <div className="down">
    <img src={Register} alt="icon" width="300" height="300" />
    Register
    </div>
    </NavLink> 
     </div>

   <div> 
   <NavLink to="/login">
   <div className="down">
   <img src={login} alt="icon" to="/login"width="300" height="300"/>
    Login
    </div>
    </NavLink>  
    </div> 
    
    </div>
    </div>
    }
    { isLoggedIn &&
    <>
    <section className={"colum "}>
            <div className="opacityBox">
           <h4> Welcome!  </h4>
           <h2> {user && user.username} </h2>
           <h5>Are you ready to get Started?</h5>
            </div>
            
    {/* <button>  <NavLink to={`/projects`}>I don't know what to do</NavLink> </button> */}
    <div className={""} >
     <div className={"space"} >
    <NavLink to="/projects"><button className={"btn btn-warning down radius"} >
    <img src={project} alt="icon" width="150" height="150" />
    Cheak Your Projects</button></NavLink> 
    </div>
    <div className={"space"} >
     <NavLink to="/projects/create" ><button className={"btn btn-warning down radius"} >
     <img className={"borders"} src={newProject} alt="icon" width="150" height="150" />
     Start a new Project </button></NavLink> 
     </div>
     </div>
     </section>
    </>
    }
    </div>
  )
}
