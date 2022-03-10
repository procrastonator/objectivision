import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import house from "./assets/house.png";
import "./Header.css";


export default function Header() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  // console.log(user)

  return (
      <nav className="navbar navbar background">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <div>
              <img src={house} alt="home Icon" width="42" height="42" />
            </div>
          </NavLink>

          <div className>
            <ul className="">
              {isLoggedIn && (
                <>
                  <NavLink
                    className=" btn btn-outline-warning "
                    aria-current="page"
                    to="/projects"
                  >
                    Projects
                  </NavLink>
                  <NavLink
                    className=" btn btn-outline-warning "
                    aria-current="page"
                    to="/projects/create"
                  >
                    New Project
                  </NavLink>
                  &nbsp;
                  <button className="btn btn-outline-warning" onClick={logOutUser} to="/">
                    Logout
                  </button>
                </>
              )}
              {/* 
        { isLoggedIn &&
            <>
            &nbsp;
            <span>{user && user.username}</span>
            </>
        } */}

              {!isLoggedIn && (
                <>
                  <NavLink
                    className="position btn btn-outline-warning"
                    aria-current="page"
                    to="/signup"
                  >
                    Register
                  </NavLink>
                  <NavLink
                    className="position btn btn-outline-warning"
                    aria-current="page"
                    to="/login"
                  >
                    Login
                  </NavLink>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
  
  );
}
