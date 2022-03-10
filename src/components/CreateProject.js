import axios from "axios";
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import "./CreateProject.css"
import { AuthContext } from "../context/auth.context"
import { useParams } from "react-router";

export default function CreateProject(props) {

  const navigate = useNavigate();
  const { userId } = useParams();
  const { getToken } = useContext(AuthContext)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    const projectDetails ={
        title: title,
        description: description,
        image: image,
        userId: userId,
    };

    const storedToken = getToken();
    
    axios.post(
      `${process.env.REACT_APP_API_URL}/projects`,
     projectDetails,
     { headers: { Authorization: `Bearer ${storedToken}` } }
     )
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
          Picture: (add url)
          <input
            type="text"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>

        <label>
          Description:
          <input
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
