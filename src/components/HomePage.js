import React from "react"
import { NavLink } from "react-router-dom"
import "./HomePage.css"


export default function HomePage() {
  return (
    <div className="HomepageBackground">
    
    <h1>React Project Management</h1>

    <NavLink to="/signup">Register</NavLink>
    
    
    </div>
  )
}
