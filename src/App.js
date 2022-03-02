import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
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
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';
import { AuthContext} from "./context/auth.context"

function App() {

  const [project, setProject] = useState([])

  const { isLoggedIn, getToken } = useContext(AuthContext);

  useEffect( () => {
    fetchProjects();
  }, [isLoggedIn]);


  const fetchProjects = () => {
    const storedToken =getToken();

    axios.get(
      `${process.env.REACT_APP_API_URL}/projects`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
      )
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

        <Route path="/projects" element={ 
        <IsPrivate>
        <ProjectsList  projectData={project} /> 
        </IsPrivate>
        } />
        <Route path='/projects/:Id' element={<ProjectDetails />} />
        <Route path="/projects/create" element={ <CreateProject updateProjects={fetchProjects} />} />
       
        <Route path="/projects/edit/:projectId" element={ 
          <IsPrivate>
        <EditProject updateProjects={fetchProjects} /> 
        </IsPrivate>
        } /> 

        <Route path="/signup" element={
           <IsAnon>
           <SignupPage />
           </IsAnon> 
           } />
        <Route path="/login" element={ 
        <IsAnon>
        <LoginPage />
        </IsAnon> 
        } />




      </Routes>
      


    </div>
  );
}

export default App;
