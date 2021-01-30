import { Link, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";

import "./Login.css";

const Login = ({ authenticate, setAuthentication }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loginSuccessful, setLoginSuccessful] = useState(false);

  function authentication(event) {
    event.preventDefault();
    if (localStorage.getItem("token")) {
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
          console.log(result);

          // setAuthentication(true);
          // setLoginSuccessful(true) (create an if statement);
        })
        .catch(console.error);
    } else {
      console.log("HA NOT WORKING");
    }
    // check that the user entered stuff first
    // ajax request to backend
    // backend response will say authenticated or not
  }

  const login = (result) => {
    localStorage.setItem("token", result.data.token);
  };

  const logOut = () => {
    localStorage.removeItem("token");
  };

  const isLoggedIn = () => {
    if (logIn) {
      console.log("is logged in");
      setAuthentication(true);
    } else {
      console.log("not logged in");
      setAuthentication(false);
    }
  };

  if (loginSuccessful) {
    return <Redirect to="/profile" />;
  }
  return (
    <div className="registerInput">
      <h1> Login Page </h1>
      <form className="form" onSubmit={authentication}>
        <label className="userLabel">Username:</label>
        <input className="userInput" minLength="8"></input>

        <label className="passwordLabel">Password:</label>
        <input className="passwordInput" minLength="8"></input>
        <div className="organizeButtons">
          <button className="loginButton" type="submit">
            Login
          </button>
          <Link className="registerButton" to="/register">
            {" "}
            Click to Register{" "}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
