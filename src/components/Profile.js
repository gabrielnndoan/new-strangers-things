import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { getToken } from "../auth";
import "./Profile.css";


const MessagesLayout = ({ messages, username }) => {
  return (
    <section className="messages">
      <h2> Messages to Me </h2>
      <section>
        {messages
          .filter((message) => {
            if (message.fromUser.username !== username) {
              return message;
            }
          })
          .map((message, index) => {
            return (
              <section className="messageList" key={index}>
                <h3>Post Title: {message.post.title} </h3>
                <h4>From: {message.fromUser.username}</h4>
                <p>Message: {message.content}</p>
              </section>
            );
          })}
      </section>
    </section>
  );
};

const Profile = ({ username, setUsername, authenticate }) => {
  const [posts, setPosts] = useState([]);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
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
        console.log(result);
        setPosts(result.data.posts);
        setMessages(result.data.messages);
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

  return (
    <div>
      {getToken() && authenticate ? (
        <>
          <h1> Welcome {username} </h1>
          <div className="profileSections">
            <section className="myPosts">
              <h2> My Posts </h2>
              <section>
                {posts.map((post, index) => {
        
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
                  
                })}
              </section>
            </section>
            <button> Create a New Post </button>
            <button onClick={() => seeAllPosts}> See All Posts </button>
            <MessagesLayout messages={messages} username={username} />
          </div>
        </>
      ) : (
        <div> Login to access profile.</div>
      )}
    </div>
  );
};

export default Profile;
