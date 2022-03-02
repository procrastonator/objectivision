import React, { useState, useEffect } from "react";
import axios from "axios";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

    
    authenticateUser();

  const storeToken = (token) => {
    localStorage.setItem('authToken', token);
  }



  const authenticateUser = () => {    
    const storedToken = localStorage.getItem('authToken');

    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      axios.get(
          `${process.env.REACT_APP_API_URL}/auth/verify`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        storeLoginDetails(response.data);
      })
      .catch((error) => {    
        resetLoginDetails();
      });
  } else {
    resetLoginDetails();
  }
}

const resetLoginDetails = () => {
  setIsLoggedIn(false);
  setIsLoading(false);
  setUser(null);
}

  const storeLoginDetails = (userDetails) => {
    setIsLoggedIn(true);
    setIsLoading(false);
    setUser(userDetails);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken, authenticateUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext };