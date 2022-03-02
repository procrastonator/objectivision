import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import "./CreateProject.css"

export default function CreateProject(props) {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    

    const projectDetails ={
        title: title,
        description: description
    };
    axios.post(`${process.env.REACT_APP_API_URL}/projects`, projectDetails)
    .then( response => {
      props.updateProjects();
      navigate("/projects");
    })
    .catch( e => console.log("error creating new project...", e) )
    
  }

  return (
    <div className="CreateProject">
      <h1>Create a new project</h1>

      <form onSubmit={handleSubmit}>

        <label>
          Title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br /><br />

        <label>
          Description:
          <textarea
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <button type="submit">Submit</button>
      </form>


    </div>
  )
}
