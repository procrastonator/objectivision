import React, { useContext } from 'react'
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context"

export default function Header () {

const {isLoggedIn, user, logOutUser } = useContext(AuthContext);
// console.log(user)


  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">

  <div class="container-fluid">

    <a class="navbar-brand" href="#">Navbar</a>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
       
      </ul>
    </div>
  </div>
</nav>

    <div className="Header">
    
        <NavLink to="/">Home</NavLink> |

        { isLoggedIn &&
            <>
        <NavLink to="/projects">Projects</NavLink> |
        <NavLink to="/projects/create">New Project</NavLink> 

            &nbsp;
            <button onClick={logOutUser}>Logout</button>
            &nbsp;
            <span>{user && user.username}</span>
        </>
        }
        { !isLoggedIn &&
            <>
            <NavLink to="/signup">Register</NavLink> |
            <NavLink to="/login">Login</NavLink>  |
            </>
        }

    </div>


    </>   
    
  )
}
