import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import "./Navigation.css";

import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Posts from "./Posts";
import Profile from "./Profile";
import Logout from "./Logout"
import { getToken } from "../auth";

const Navigation = ({ authenticate, setAuthentication, token, setToken, username, setUsername }) => {
  getToken(token);
  return (
    <div>
      <header> Stranger's Things </header>
      <Router>
        <div className="searchAndMenu">
          <nav>
            <form className="navForm">
              <label className="searchBar"> Search </label>
              <input></input>
            </form>
            <Link to="/home" className="link">
              HOME
            </Link>
            <Link to="/posts" className="link">
              POSTS
            </Link>
            <Link to="/profile" className="link">
              PROFILE
            </Link>
            {authenticate ? (
              <Link to="/logout" className="link">
                LOGOUT
              </Link>
            ) : (
              <Link to="/login" className="link">
                LOGIN
              </Link>
            )}
            <Link to="/register" className="link">
              REGISTER
            </Link>
          </nav>
        </div>
        <main>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/posts">
              <Posts
                authenticate={authenticate}
                setAuthentication={setAuthentication}
                token={token}
              />
            </Route>
            <Route path="/profile">
              <Profile
                authenticate={authenticate}
                setAuthentication={setAuthentication}
                token={token}
                username={username}
                setUsername={setUsername}
              />
            </Route>
            <Route path="/login">
              <Login
                authenticate={authenticate}
                setAuthentication={setAuthentication}
                token={token}
                username={username}
                setUsername={setUsername}
              />
            </Route>
            <Route path="/logout">
              <Logout
                authenticate={authenticate}
                setAuthentication={setAuthentication}
                token={token}
              />
            </Route>
            <Route path="/register">
              <Register
                authenticate={authenticate}
                setAuthentication={setAuthentication}
                token={token}
                setToken={setToken}
                username={username}
                setUsername={setUsername}
              />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
};

export default Navigation;
