import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
  } from 'react-router-dom';

import './Navigation.css';

import Home from "./Home"
import Register from "./Register"
import Login from "./Login"

  const Navigation = () => {
    return (
        <div>
            <header> Stranger's Things </header>
        <Router>
          <div className="searchAndMenu">
          <nav>
            <form className="navForm">
              <label> Search </label>
              <input></input>
            </form>
            <Link to="/home" className="link">HOME</Link>
            <Link to="/posts" className="link">POSTS</Link>
            <Link to="/profile" className="link">PROFILE</Link>
            <Link to="/login" className="link">LOGIN</Link>
            <Link to="/register" className="link">REGISTER</Link>
          </nav>
          </div>
          <main>
            <Switch>
              <Route path="/home">
                <Home/>
              </Route>
              <Route path="/posts">
              <div> posts </div>
              </Route>
              <Route path="/profile">
              <div> profile </div>
              </Route>
              <Route path="/login">
             <Login />
              </Route>
              <Route path="/register">
                <Register/>
              </Route>
            </Switch>
          </main>
        </Router>
        </div>
      )
  }

  export default Navigation;