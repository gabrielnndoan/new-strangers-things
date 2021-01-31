import { useHistory } from "react-router-dom";
import "./Posts.css";

const Posts = () => {
  return (
    <div className="postPage">
      <h1> Listed Posts </h1>
      <section className="allPosts">
        <h2> All Posts </h2>
        <section className="post"></section>
      </section>
      <section className="makePost">
        <h3> Make a New Post </h3>
        
          <form className="postForm">
            <label className="titleLabel" id="wrapper">Item:</label>
            <input className="titleInput"></input>

            <label className="descriptionLabel">Description:</label>
            <input className="descriptionInput"></input>

            <label className="priceLabel">Price:</label>
            <input className="priceInput"></input>
          </form>
        <button className="makePostButton"> Make a New Post </button>
      </section>
    </div>
  );
};

export default Posts;
