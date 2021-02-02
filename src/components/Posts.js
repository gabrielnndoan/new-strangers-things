import { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom'
import "./Posts.css";

const Posts = ({ authenticate, token }) => {
  const [ posts, setPosts ] = useState({ posts: [] });
  const [ title, setTitle ] = useState()
  const [ description, setDescription ] = useState()
  const [ price, setPrice ] = useState()

  useEffect( () => {
    fetch('https://strangers-things.herokuapp.com/api/2010-LSU-RM-WEB-PT/posts')
        .then(response => response.json())
        .then(result => {
        console.log(result);
        setPosts(result.data)
        })
        .catch(console.error);
  }, [])

  function makeNewPost(event){
    event.preventDefault();
    fetch('https://strangers-things.herokuapp.com/api/COHORT-NAME/posts', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ token }`
      },
      body: JSON.stringify({
        post: {
          title: title,
          description: description,
          price: price,
        }
      })
        }).then(response => response.json())
          .then(result => {
        console.log(result);
        })
        .catch(console.error);
  }

  return (
    <div className="postPage">
      <h1> Listed Posts </h1>
      <section className="allPosts">
        <h2> All Posts </h2>
        <section>
          {posts.posts.map((post, index) => {
              return (
                  <div className="post" key = { index }>
                      <h3> { post.author.username } </h3>
                      <h4> { post.title } </h4>
                      <ul>
                          <li> { post.description} </li>
                          <li> { post.price } </li>
                      </ul>
                      <button> Make An Offer/ Send Message </button>
                      {authenticate ? <button onClick={ () => {
                        if(authenticate){
                          <Redirect to='/profile'/>
                        } else {
                          alert('you are not logged in!')
                        }
                      }}> View Messages </button> : null}
                  </div>
              )
          })}
        </section>
        
      </section>
      <section className="makePost">
        <h3> Make a New Post </h3>
        
          <form className="postForm" onSubmit={ makeNewPost }>
            <label className="titleLabel" id="wrapper">Title:</label>
            <input className="titleInput" 
              onChange={(event, token) => {
                if(token){
                setTitle(event.target.value)};
            }}></input>

            <label className="descriptionLabel">Description:</label>
            <input className="descriptionInput"
              onChange={(event, token) => {
                if(token){
                setDescription(event.target.value)};
            }}></input>

            <label className="priceLabel">Price:</label>
            <input className="priceInput"
              onChange={(event, token) => {
                if(token){
                setPrice(event.target.value)};
            }}></input>
          </form>
        <button className="makePostButton" type="submit"> Make a New Post </button>
      </section>
    </div>
  );
};

export default Posts;
