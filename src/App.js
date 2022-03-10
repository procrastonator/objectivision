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
import CreateGoal from './components/CreateGoal';
import UpdateGoal from './components/UpdateGoal';
import Footer from './components/Footer';

function App() {

  const [projects, setProjects] = useState([]);
  const [ userProjects, setUserProjects] = useState([]);
  const { getToken, user } = useContext(AuthContext);

  const fetchProjects = () => {
    const storedToken = getToken();

    axios.get(
      `${process.env.REACT_APP_API_URL}/projects`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then(response => {
        setProjects(response.data);
      })
      .catch(e => console.log("error getting list of projects...", e));
  }

  useEffect( () => {
    fetchProjects();
  }, []);

  useEffect( () => {
    if (user && projects.length){
      const userfilter = projects.filter(e => e.userId === user._id);
      setUserProjects(userfilter) 
    }
  }, [user, projects]);


  return (
    <div className="App">

    <Header />
      <Routes>      
        <Route path="/" element={ <HomePage /> } />

        <Route path="/projects" element={ 
      <IsPrivate>
        <ProjectsList  projectData={userProjects} /> 
      </IsPrivate>
        } />
        
        <Route path='/projects/:projectId' element={
      <IsPrivate>
        <ProjectDetails updateProjects={fetchProjects}/>
      </IsPrivate>
        } />

        <Route path='/projects/:projectId/goal' element={
      <IsPrivate>
        <CreateGoal updateProjects={fetchProjects}/>
      </IsPrivate>
        }  />
       
       
        <Route path='/projects/:goalId/update' element = {
      <IsPrivate>
        <UpdateGoal updateProjects={fetchProjects} />
      </IsPrivate>
        } />

        <Route path="/projects/create" element={ 
      <IsPrivate>
        <CreateProject updateProjects={fetchProjects}  />
      </IsPrivate>
        } />
       
        <Route path="/projects/:projectId/edit" element={ 
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

      <Footer />
    </div>
  );
}

export default App;