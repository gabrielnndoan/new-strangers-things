import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import "./Posts.css";
import {getToken} from "../auth"

const Posts = ({ authenticate }) => {
  const [posts, setPosts] = useState({ posts: [] });
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();

  useEffect(() => {
    fetch("https://strangers-things.herokuapp.com/api/2010-LSU-RM-WEB-PT/posts")
      .then((response) => response.json())
      .then((result) => {
        setPosts(result.data);
      })
      .catch(console.error);
  }, []);

  function makeNewPost(event) {
    event.preventDefault();
    console.log(token);
    getToken(token)
    if (getToken()) {
      fetch(
        "https://strangers-things.herokuapp.com/api/2010-LSU-RM-WEB-PT/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            post: {
              title: title,
              description: description,
              price: price,
            },
          }),
        }
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(token);
          console.log(result);
        })
        .catch(console.error);
    }
  }

  return (
    <div className="postPage">
      <h1> Listed Posts </h1>
      <section className="allPosts">
        <h2> All Posts </h2>
        <section>
          {posts.posts.map((post, index) => {
            return (
              <div className="post" key={index}>
                <h3> {post.author.username} </h3>
                <h4> {post.title} </h4>
                <ul>
                  <li> {post.description} </li>
                  <li> {post.price} </li>
                </ul>
                <button> Send Message </button>
                {authenticate ? (
                  <button
                    onClick={() => {
                      if (authenticate) {
                        <Redirect to="/profile" />;
                      } else {
                        alert("you are not logged in!");
                      }
                    }}
                  >
                    View Messages
                  </button>
                ) : null}
              </div>
            );
          })}
        </section>
      </section>
      <section className="makePost">
        <h3> Make a New Post </h3>

        <form className="postForm" onSubmit={makeNewPost}>
          <label className="titleLabel" id="wrapper">
            Title:
          </label>
          <input
            className="titleInput"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          ></input>

          <label className="descriptionLabel">Description:</label>
          <input
            className="descriptionInput"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          ></input>

          <label className="priceLabel">Price:</label>
          <input
            className="priceInput"
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          ></input>
          <button className="makePostButton" type="submit">
            Make a New Post
          </button>
        </form>
      </section>
    </div>
  );
};

export default Posts;
