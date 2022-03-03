import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context"

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

    const { storeToken, authenticateUser } = useContext(AuthContext)

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => { 
    e.preventDefault();

    const userDetails = {
      email,
      password
    }
    axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, userDetails)
    .then( response => {
        storeToken(response.data.authToken);
        authenticateUser();
       //   console.log(response);
      navigate("/");
    })
    .catch(error => {
      const msg = error.response.data.errorMessage;
      console.log("error loggin in...", msg);
      setErrorMessage(msg);
    });
};
  return (
    <div className="LoginPage">
      <h1>Login</h1>

      {errorMessage && <p className="error">{errorMessage}</p>}

      <form onSubmit={handleLoginSubmit}>
        <label>
          Email:
          <input
            type="text"
            required={true}
            name="email"
            value={email}
            onChange={handleEmail}
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

        <button type="submit">Login</button>
      </form>


      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>

    </div>
  )
}

export default LoginPage;
