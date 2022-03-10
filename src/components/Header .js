import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import house from "./assets/house.png";
import "./Header.css";

export default function Header() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  // console.log(user)

  return (
    <section className="background">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <div>
              <img src={house} alt="home Icon" width="39" height="35" />
              <div>Home</div>
            </div>
          </NavLink>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              {isLoggedIn && (
                <>
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/projects"
                  >
                    Projects
                  </NavLink>
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/projects/create"
                  >
                    New Project
                  </NavLink>
                  &nbsp;
                  <button onClick={logOutUser} to="/">
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
                    className="nav-link active"
                    aria-current="page"
                    to="/signup"
                  >
                    Register
                  </NavLink>
                  <NavLink
                    className="nav-link active"
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
    </section>
  );
}
