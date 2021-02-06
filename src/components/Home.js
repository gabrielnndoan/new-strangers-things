import './Home.css';
import { Link } from "react-router-dom";

const Home = ({ authenticate, username }) => {
  if(authenticate){
    return (<div> Welcome { username } </div>)
  } else{
    return (
      <div className="homePage">
        <div className="welcome">Welcome to the Homepage</div>
        <div className="description">Use this website to purchase or sell used goods.</div>
        <Link className="allPostsButton" to="/posts">See All Posts</Link>
        <Link className="loginButton" to="/login">Login/Register</Link>
      </div>
    )
  };
};

export default Home;