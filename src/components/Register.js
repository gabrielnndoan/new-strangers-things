import "./Register.css";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { login, getToken } from '../auth'

const Register = ({ authenticate, setAuthentication, username, setUsername, token, setToken }) => {
  const [ password, setPassWord ] = useState();
  const [ passwordConfirmation, setPassWordConfirmation ] = useState();

  function createUser(event) {
    event.preventDefault();
    if (username && password && password === passwordConfirmation) {
      fetch(
        "https://strangers-things.herokuapp.com/api/2010-LSU-RM-WEB-PT/users/register",
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
          setToken(getToken());
          isLoggedIn(result)
        })
        .catch(console.error);
    }
  }

  const isLoggedIn = (result) => {
    if (result.data.token) {
      console.log("is logged in");
      setAuthentication(true);
    } else {
      console.log("not logged in");
    }
  };

  if (authenticate && token) {
    return <Redirect to="./profile" />;
  }
  return (
    <div className="registerInput">
      <h1> Register Page </h1>
      <p className="rules"> Username & Password must be 8 characters! </p>
      <form className="form" onSubmit={ createUser }>
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
            setPassWord(event.target.value);
          }}
        ></input>

        <label className="confirmLabel">Password Confirmation:</label>
        <input
          className="confirmInput"
          minLength="8"
          onChange={(event) => {
            setPassWordConfirmation(event.target.value);
          }}
        ></input>
        <button className="submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;