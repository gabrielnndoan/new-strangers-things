import { useHistory } from 'react-router-dom';

import './Login.css'

const Login = () => {
    
    const history = useHistory();
    const handleRoute = () =>{
        history.push("/register");
    }

    return (
        <div className="registerInput">
          <h1> Login Page </h1>
          <form className="form">
            <label className="userLabel">Username:</label>
            <input className="userInput"></input>
    
            <label className="passwordLabel">Password:</label>
            <input className="passwordInput"></input>

          </form>
          <button className="loginButton">Login</button>
          <button className="registerButton" onClick={handleRoute}>Click to Register</button>
        </div>
      );
}

export default Login;