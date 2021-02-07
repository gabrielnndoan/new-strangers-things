import './root.css'
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Home, Register, Login, Posts, Profile, Logout } from "./components";
import { getToken, getUsername } from "./auth";



const App = () => {
  const [ authenticate, setAuthentication ] = useState(false);
  const [ token, setToken ] = useState("");
  const [ username, setUsername ] = useState();

    useEffect(() => {
      if (getToken()) {
        setAuthentication(true)
      }
      getUsername()
      .then((response) => response.json())
      .then((result) => {
        setUsername(result.data.username);
      })
      .catch(console.error);

    }, []);
    return (
      <div>
        <header> Stranger's Things </header>
        <Router>
          <div>
          <div className="searchAndMenu">
            <nav>
              <form className="navForm" />
              <Link to="/" className="link">
                HOME
              </Link>
              <Link to="/posts" className="link">
                POSTS
              </Link>
              <Link to="/profile" className="link">
                PROFILE
              </Link>
              { getToken() && authenticate ? (
                <Link to="/logout" className="link">
                  LOGOUT
                </Link>
              ) : (
                <Link to="/login" className="link">
                  LOGIN
                </Link>
              )}
            </nav>
          </div>
          <main>
            <Switch>
              <Route exact path="/">
                <Home 
                  authenticate={ authenticate } 
                  username={ username }
                />
              </Route>
              <Route path="/posts">
                <Posts
                  authenticate={ authenticate }
                  username={ username }
                  setUsername={ setUsername }
                />
              </Route>
              <Route path="/profile">
                <Profile
                  authenticate={ authenticate }
                  username={ username }
                  setUsername={ setUsername }
                />
              </Route>
              <Route path="/login">
                <Login
                  authenticate={ authenticate }
                  setAuthentication={ setAuthentication }
                  username={ username }
                  setUsername={ setUsername }
                  setToken={ setToken }
                />
              </Route>
              <Route path="/logout">
                <Logout
                  authenticate={ authenticate }
                  setAuthentication={ setAuthentication }
                />
              </Route>
              <Route path="/register">
                <Register
                  authenticate={ authenticate }
                  setAuthentication={ setAuthentication }
                  username={ username }
                  setUsername={ setUsername }
                  token={ token }
                  setToken={ setToken }
                />
              </Route>
            </Switch>
          </main>
          </div>
        </Router>
      </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));