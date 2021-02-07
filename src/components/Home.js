import "./Home.css";
import { Link } from "react-router-dom";

const Home = ({ authenticate, username }) => {
  if (authenticate) {
    return (
      <div >
        <h3 className="loggedInHomePage">Welcome {username}</h3>
        <Link className="allPostsButtonLogin" to="/posts">
          See All Posts
        </Link>
      </div>
    );
  } else {
    return (
      <div className="homePage">
        <div className="welcome">Welcome to Stranger's Things!</div>
        <div className="description">
          Stranger's Things was created, by two geniuses with lots of brain cells, 
          to service those who want to sell or buy items from strangers on the internet. Be careful! Use at your own risk.  
        </div>
        <Link className="allPostsButton" to="/posts">
          See All Posts
        </Link>
        <Link className="loginButtonHome" to="/login">
          Login/Register
        </Link>
      </div>
    );
  }
};

export default Home;
