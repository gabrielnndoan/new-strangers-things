import { Link, Redirect } from "react-router-dom";
import { useState } from "react";

import "./Login.css";
import {getToken, login} from "../auth";

const Login = ({
  authenticate,
  setAuthentication,
  username,
  setUsername,
  setToken
}) => {
  const [password, setPassword] = useState();
  const [loginSuccessful, setLoginSuccessful] = useState(false);

  function authentication(event) {
    event.preventDefault();

    fetch(
      "https://strangers-things.herokuapp.com/api/2010-LSU-RM-WEB-PT/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password,
          },
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        login(result.data.token);
        setToken(getToken())
        isLoggedIn(result.data.token);
      })
      .catch(console.error);
  }

  const isLoggedIn = (token) => {
    if (token) {
      console.log("is logged in");
      setAuthentication(true);
      setLoginSuccessful(true);
    } else {
      console.log("not logged in");
    }
  };

  if (loginSuccessful && authenticate) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className="registerInput">
      <h1> Login Page </h1>
      <form className="form" onSubmit={authentication}>
        <label className="userLabel">Username:</label>
        <input
          className="userInput"
          minLength="8"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        ></input>

        <label className="passwordLabel">Password:</label>
        <input
          className="passwordInput"
          minLength="8"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        ></input>
        <div className="organizeButtons">
          <button className="loginButton" type="submit">
            Login
          </button>
          <Link className="registerButton" to="/register">
            Click to Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
