import "./Logout.css";
import { Redirect } from "react-router-dom";
import { getToken, logout } from "../auth";

const Logout = ({ token }) => {
  getToken(token);
  const logOutCompletely = () => {
    if (localStorage.getItem("token")) {
      logout();
    }
    return <Redirect to="/home" />;
  };
  return <button onClick={logOutCompletely}>Logout button</button>;
};
export default Logout;
