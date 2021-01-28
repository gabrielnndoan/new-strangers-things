import './Home.css';

const Home = () => {
  return (
    <div className="homePage">
      <div>Welcome to the Homepage</div>
      <div>Use this website to purchase or sell used goods.</div>
      <button className="latestPostButton">Latest Post</button>
      <button className="allPostsButton">See All Posts</button>
      <button className="loginButton">Login/Register</button>
    </div>
  );
};

export default Home;
