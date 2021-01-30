import { Link, Redirect } from 'react-router-dom';
import { useState } from 'react';

import './Login.css'

const Login = ({authenticate, setAuthentication}) => {
  const [ username, setUsername ] = useState();
  const [ password, setPassword ] = useState();
  const [ loginSuccessful, setLoginSuccessful ] = useState(false); 
  
  function authentication(event){

    event.preventDefault();
    console.log('submitted successfully');
    setAuthentication(true);
    setLoginSuccessful(true);
    
  }
  if(loginSuccessful){
    return <Redirect to='/profile'/>
  }
    return (
        <div className="registerInput">
          <h1> Login Page </h1>
          <form className="form" onSubmit={authentication}>
            <label className="userLabel">Username:</label>
            <input className="userInput"></input>
    
            <label className="passwordLabel">Password:</label>
            <input className="passwordInput"></input>
            <div className="organizeButtons">
              <button className="loginButton" type="submit">Login</button>
              <Link className="registerButton" to='/register'> Click to Register </Link>
            </div>
          </form>
        </div>
      );
}

export default Login;