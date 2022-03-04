import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../context/auth.context";
import "./HomePage.css"


export default function HomePage() {

  const {isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div>
    

    { !isLoggedIn &&
    <div className="HomepageBackground">
    <div className="center">
    <h1>React Project Management</h1>

    <NavLink to="/signup">Register</NavLink>|
    <NavLink to="/login">Login</NavLink>  
    
    </div>
    </div>
    }
    { isLoggedIn &&
    <>
    <h2> adding many future buttons</h2>
    <br />
    <h2> adding many future buttons</h2>
    <br />
    <h2> adding many future buttons</h2>
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
