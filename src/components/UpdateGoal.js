import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./UpdateGoal.css"

//use UseParams to grab the goalId [x]
//change your backend route --> grab the goalId with req.params in server side
// send the object with the new goal information to the backend
// use this object in your server side code to update the goal

export default function UpdateGoal(props) {
  const { getToken } = useContext(AuthContext);
  const { goalId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const storedToken = getToken();

  useEffect(() => {
    console.log(goalId);
    axios
      .get(`${process.env.REACT_APP_API_URL}/goals/${goalId}`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        const oneProject = response.data;
        setTitle(oneProject.title);
        setDescription(oneProject.description);
        setLink(oneProject.link)
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const goalDetails = { title, description, link };

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/goals/${goalId}/update`,
        goalDetails,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        console.log(response);
        props.updateProjects();
        navigate(`/projects/${response.data.projectId}`);
      });
  };

  return (
    <div className="editGoal">
      <h1>Update Goal</h1>

      <form onSubmit={handleSubmit}>
      <div>
        <label>
          Title:
        </label>
      </div>
        <div>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
       </div>
    	<div>
        <label>
          Description:
          </label>
        </div>
        <div>
          <textarea rows="4" cols="50"
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
       </div>

        <div>
        <label> Link: Add your url Link here</label>
        </div>
        <div>
        <textarea
          type="text"
          name="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
       </div>
        <div>
        <button type="submit" className="btn btn-success submitUpdateGoal">Submit</button>
        <button className="btn btn-dark backButtonUpdate">Back</button>
        </div>
      </form>
    </div>
  );
}
