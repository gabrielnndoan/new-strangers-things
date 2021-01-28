import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
  } from 'react-router-dom';

import './Navigation.css';

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
                <div> Home </div>
              </Route>
              <Route path="/posts">
               
              </Route>
              <Route path="/">
                
              </Route>
            </Switch>
          </main>
        </Router>
        </div>
      )
  }

  export default Navigation;