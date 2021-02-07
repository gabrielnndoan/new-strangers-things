import "./Posts.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUsername } from "../auth";
import SendMessages from "./SendMessages";
import MakePostForm from "./MakePost"

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
      {authenticate ? <MakePostForm posts={ posts } setPosts={ setPosts } /> : null}
      <section className="allPosts" >
        <form>
          <h2> All Posts </h2>
          <label className="searchBar"> SEARCH</label>
          <input
            className="searchBarInput"
            type="text"
            placeholder="Search"
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <section>
            {posts
              .filter((post) => {
                if(searchTerm === "") {
                  return post
                } else if(post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    post.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    post.author.username.toLowerCase().includes(searchTerm.toLowerCase())) {
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
                      <li className="price"> { post.price } </li>
                    </ul>
                    { authenticate && username !== post.author.username ? (
                      <SendMessages
                        id={ post._id }
                      />
                    ) : null }
                    { authenticate && username === post.author.username ? <Link className="viewMessagesButton" to="/profile">View Messages</Link> : null }
                  </div>
                );
              })}
          </section>
        </form>
      </section>
    </div>
  );
};

export default Posts;