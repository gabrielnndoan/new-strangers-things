import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import "./Profile.css";
import { getToken } from "../auth";

const Messages = () => {
  return (
    <section className="messages">
      <h2> My Messages </h2>
      <section className="messageList"></section>
    </section>
  );
};

const MyPost = ({ posts, username }) => {
  return (
    <div>
      <h1> Welcome {username} </h1>
      <div className="profileSections">
        <section className="myPosts">
          <h2> My Posts </h2>
          <section>
            {posts.map((post, index) => {
              if (username === post.author.username) {
                return (
                  <div className="postList" key={index}>
                    <h3> {post.author.username} </h3>
                    <h4> {post.title} </h4>
                    <ul>
                      <li> {post.description} </li>
                      <li> {post.price} </li>
                    </ul>
                    <button> View Messages </button>
                    <button onClick={() => deletePost(post._id)}>
                      Delete Post
                    </button>
                  </div>
                );
              }
            })}
          </section>
        </section>
        <button> Create a New Post </button>
        <button onClick={() => seeAllPosts}> See All Posts </button>
        <Messages />
      </div>
    </div>
  );
};

const Profile = ({ username, setUsername }) => {
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("https://strangers-things.herokuapp.com/api/2010-LSU-RM-WEB-PT/posts")
      .then((response) => response.json())
      .then((result) => {
        setPosts(result.data.posts);
      })
      .catch(console.error);
    fetch(
      "https://strangers-things.herokuapp.com/api/2010-LSU-RM-WEB-PT/users/me",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setUsername(result.data.username);
      })
      .catch(console.error);
  }, []);

  function deletePost(postIdDeleted) {
    fetch(
      `https://strangers-things.herokuapp.com/api/2010-LSU-RM-WEB-PT/posts/${postIdDeleted}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result) {
          const newPosts = posts.filter((post) => post._id !== postIdDeleted);
          console.log(newPosts);
          setPosts(newPosts);
        }
      })
      .catch(console.error);
  }

  return <MyPost posts={posts} username={username} />;
};

export default Profile;
