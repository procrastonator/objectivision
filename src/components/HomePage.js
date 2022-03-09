import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../context/auth.context";
import "./HomePage.css"
import icon from "./assets/getting-it-done.jpeg"



export default function HomePage() {

  const {isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div>
    

    { !isLoggedIn &&
    <div className="HomepageBackground">
    <div className="center">
    <h1>Project Vision</h1>
    <h2> A place to get your Goals in order</h2>

    <div> <img src={icon} alt="icon" width="300" height="300"/>

   <div> <NavLink to="/signup">Register</NavLink> </div> </div>

   <div> <img src={icon} alt="icon" width="300" height="300"/>
     <div> <NavLink to="/login">Login</NavLink>  </div> </div>
    
    </div>
    </div>
    }
    { isLoggedIn &&
    <>
            <div>
            Welkome <br />
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
