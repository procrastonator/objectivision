import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import house from "./assets/home-logo-pin.webp";
import logout from "./assets/log-out-outline.svg"
import create from "./assets/create-outline.svg"
import list from "./assets/list-outline.svg"

import "./Header.css";


export default function Header() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  // console.log(user)

  return (
      <nav className="navbar navbar background">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <div className="HomeText btn btn-outline-info">
              <img className="" src={house} alt="home Icon " width="55" height="45" />
              Main Board 
            </div>
          </NavLink>

          <div className>
            <ul className="box">
              {isLoggedIn && (
                <>
                <div className="spacing">
                  <NavLink
                    className=" btn btn-outline-warning yellow"
                    aria-current="page"
                    to="/projects"
                  >
                    Projects
                  <img className="move-left" src={list} alt="home Icon " width="20" height="20" />
                  </NavLink>
                  </div>
                  <div className="spacing">
                  <NavLink
                    className=" btn btn-outline-warning yellow"
                    aria-current="page"
                    to="/projects/create"
                  >
                    New Project
                    <img className="move-left" src={create} alt="home Icon " width="20" height="20" />
                  </NavLink>
                  </div>
                  <div className="spacing">
                  <button className="btn btn-outline-warning yellow" onClick={logOutUser} to="/">
                    Logout
                    <img className="move-left" src={logout} alt="home Icon " width="20" height="20" />
                  </button>
                  </div>
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
                <div className="logout">
                <div className="spacing">
                  <NavLink
                    className="position btn btn-outline-warning"
                    aria-current="page"
                    to="/signup"
                  >
                    Register
                  </NavLink>
                  </div>
                  <div>
                  <NavLink
                    className="position btn btn-outline-warning"
                    aria-current="page"
                    to="/login"
                  >
                    Login
                  </NavLink>
                  </div>
                  </div> 
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
  
  );
}
