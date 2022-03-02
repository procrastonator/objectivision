import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import HomePage from './components/HomePage';
import ProjectsList from './components/ProjectsList';
import Header from './components/Header ';
import { Routes, Route } from "react-router-dom"; 
import ProjectDetails from './components/ProjectDetails';
import CreateProject from './components/CreateProject';
import EditProject from './components/EditProject';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';


function App() {

  const [project, setProject] = useState([])

  useEffect( () => {
    fetchProjects();
  }, []);


  const fetchProjects = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/projects`)
      .then(response => {
        setProject(response.data);
      })
      .catch(e => console.log("error getting list of projects...", e));
  }

  return (
    <div className="App">

    <Header />

      <Routes>      
        <Route path="/" element={ <HomePage /> } />
        <Route path="/projects" element={ <ProjectsList  projectData={project} /> } />
        <Route path='/projects/:Id' element={<ProjectDetails />} />
        <Route path="/projects/create" element={ <CreateProject updateProjects={fetchProjects} />} />
        <Route path="/projects/edit/:projectId" element={ <EditProject updateProjects={fetchProjects} /> } /> 

        <Route path="/signup" element={ <SignupPage /> } />
        <Route path="/login" element={ <LoginPage /> } />

      </Routes>
      


    </div>
  );
}

export default App;
