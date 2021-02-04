import "./Register.css";

import { useState } from "react";
import { Redirect } from "react-router-dom";

const Register = ({ authenticate, setAuthentication, token, setToken, username, setUsername }) => {
  
  const [password, setPassWord] = useState();
  const [passwordConfirmation, setPassWordConfirmation] = useState();

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
          console.log(result);
          // setToken state result
          login(result);
          setToken(localStorage.getItem("token"));
        })
        .catch(console.error);
    }
  }
  console.log(token);

  const login = (result) => {
    localStorage.setItem("token", result.data.token);
  };

  const logOut = () => {
    localStorage.removeItem("token");
  };

  const isLoggedIn = (result) => {
    if (result.data.token) {
      console.log("is logged in");
      setAuthentication(true);
    } else {
      console.log("not logged in");
    }
  };

  // if (login) {
  //   return <Redirect to="./profile" />;
  // }
  return (
    <div className="registerInput">
      <h1> Register Page </h1>
      <form className="form" onSubmit={createUser}>
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

        <label className="confirmLabel">Password:</label>
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
