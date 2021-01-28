import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
  } from 'react-router-dom';

import './Navigation.css';

import Home from "./Home"

  const Navigation = () => {
    return (
        <div>
            <header> Stranger's Things </header>
        <Router>
          <nav>
            <Link to="/home" className="link">HOME</Link>
            <Link to="/posts" className="link">POSTS</Link>
            <Link to="/profile" className="link">PROFILE</Link>
            <Link to="/login" className="link">LOGIN</Link>
          </nav>
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
              <div> login </div>
              </Route>
            </Switch>
          </main>
        </Router>
        </div>
      )
  }

  export default Navigation;