import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../context/auth.context";
import "./HomePage.css"
import Register from "./assets/getting-it-done.jpeg"
import login from "./assets/Login-postit.webp"



export default function HomePage() {

  const {isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div>
    

    { !isLoggedIn &&
    <div className="HomepageBackground">
    <div className="center">
    <div classname="title">
    <h1>Project Vision</h1>
    <h2> A place to get your Goals in order</h2>
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
    </div>
    }
    { isLoggedIn &&
    <>
            <div>
            Welcome <br />
            {user && user.username}
            </div>
      
    <br />
    <button><NavLink to="/projects">Projects</NavLink> </button>
    <br /> 
    <br /> 
    <button> <NavLink to="/projects/create">New Project</NavLink> </button>
    </>
    }
    </div>
  )
}
