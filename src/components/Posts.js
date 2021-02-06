import "./Posts.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getToken, getUsername } from "../auth";
import SendMessages from "./SendMessages";

const Posts = ({ authenticate, username, setUsername }) => {
  const [ posts, setPosts ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState("");

  useEffect(() => {
    getUsername()
    .then((response) => response.json())
      .then((result) => {
        setUsername(result.data.username);
      })
      .catch(console.error);
  
    fetch("https://strangers-things.herokuapp.com/api/2010-LSU-RM-WEB-PT/posts")
      .then((response) => response.json())
      .then((result) => {
        setPosts(result.data.posts);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="postPage">
      <section className="allPosts">
        <form>
          <h2> All Posts </h2>
          <label className="searchBar"> Search </label>
          <input
            type="text"
            placeholder="Search"
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <section>
            {posts
              .filter((post) => {
                if(searchTerm === "") {
                  return post
                } else if(post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.description.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return post
                }
              })
              .map((post, index) => {
                return (
                  <div className="post" key={index}>
                    <h3> { post.title }  </h3>
                    <h4> { post.author.username } </h4>
                    <ul>
                      <li> { post.description } </li>
                      <li> { post.price } </li>
                    </ul>
                    { authenticate && username !== post.author.username ? (
                      <SendMessages
                        id={ post._id }
                      />
                    ) : null }
                    { username === post.author.username ? <Link to="/profile">View Messages</Link> : null }
                  </div>
                );
              })}
          </section>
        </form>
      </section>
      <MakePostForm posts={ posts } setPosts={ setPosts } />
    </div>
  );
};

const MakePostForm = ({ posts, setPosts }) => {
  const [ title, setTitle ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ price, setPrice ] = useState("");

  function makeNewPost(event) {
    event.preventDefault();
    if (getToken()) {
      fetch(
        "https://strangers-things.herokuapp.com/api/2010-LSU-RM-WEB-PT/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ getToken() }`,
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
          if (result) {
            const newPosts = [...posts];
            newPosts.push(result.data.post);
            setPosts(newPosts);
          }
        })
        .catch(console.error);
    }
    event.target.reset();
  }

  return (
    <section className="makePost">
      <h3> Make a New Post </h3>
      <form className="postForm" onSubmit={ makeNewPost }>
        <label className="titleLabel" id="wrapper">
          Title:
        </label>
        <input
          className="titleInput"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <label className="descriptionLabel">Description:</label>
        <input
          className="descriptionInput"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <label className="priceLabel">Price:</label>
        <input
          className="priceInput"
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        />
        <button className="makePostButton" type="submit">
          Make a New Post
        </button>
      </form>
    </section>
  );
};

export default Posts;