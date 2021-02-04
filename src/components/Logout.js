import "./Logout.css";
import { Redirect } from "react-router-dom";
import { useState } from 'react';
import { getToken, logout } from "../auth";

const Logout = ({ token, authenticate, setAuthentication }) => {
  const [logoutSuccessful, setLogoutSuccessful]= useState(false);
  getToken(token);
  const logOutCompletely = () => {
    if (localStorage.getItem("token")) {
      logout();
      setAuthentication(false);
      setLogoutSuccessful(true)
    }
    
  };

  logOutCompletely();

  if(logoutSuccessful){ 
    return <Redirect to="/home" />;
  } 
  return null;
};
export default Logout;
