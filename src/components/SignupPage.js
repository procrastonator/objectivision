import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context"



function SignupPage(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  
  const handleUsername = (e) => setUsername(e.target.value);
  const handelEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  
  const handleSignupSubmit = (e) => {
      e.preventDefault();

      const userDetails = {
        username,
        email,
        password
      }

     
    axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, userDetails)
    .then( (response) => {
      storeToken (response.data.authToken);
      authenticateUser();
     //   console.log(response);
    navigate("/");
    })
    .catch( error => {
      const msg = error.response.data.errorMessage;
      console.log("error creating new user...", msg);
      setErrorMessage(msg);
    });

      
  };

  
  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>

      {errorMessage && <p className="error">{errorMessage}</p>}

      <form onSubmit={handleSignupSubmit}>
     
        <label>
        Username:
        <input 
          type="text"
          required={true}
          name="username"
          value={username}
          onChange={handleUsername}
        />
        </label>

        <label>
        Email:
        <input 
          type="text"
          required={true}
          name="email"
          value={email}
          onChange={handelEmail}
        />
        </label>

        <label>
        Password:
        <input 
          type="password"
          required={true}
          name="password"
          value={password}
          onChange={handlePassword}
        />
        </label>


        <button type="submit">Register</button>
      </form>



      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  )
}

export default SignupPage;
