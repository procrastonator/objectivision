import React, { useContext } from 'react'
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context"

export default function Header () {

const {isLoggedIn, user, logOutUser } = useContext(AuthContext);
// console.log(user)


  return (
    <div>

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


        
    </div>
  )
}
