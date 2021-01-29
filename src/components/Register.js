import "./Register.css";

const Register = () => {
  return (
    <div className="registerInput">
      <h1> Register Page </h1>
      <form className="form">
        <label className="userLabel">Username:</label>
        <input className="userInput"></input>

        <label className="passwordLabel">Password:</label>
        <input className="passwordInput"></input>

        <label className="confirmLabel">Password:</label>
        <input className="confirmInput"></input>
      </form>
      <button className="submit">Submit</button>
    </div>
  );
};

export default Register;
