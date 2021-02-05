import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import "./Posts.css";
import { getToken } from "../auth";
// import Main from "./Modal";

const MakePostForm = ({ posts, setPosts }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  function makeNewPost(event) {
    event.preventDefault();
    if (getToken()) {
      fetch(
        "https://strangers-things.herokuapp.com/api/2010-LSU-RM-WEB-PT/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
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
          console.log(result);
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
      <form className="postForm" onSubmit={makeNewPost}>
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

// const Messages = () => {
//   const [messages, setMessages] = useState("")
// function createMessage() {
//   fetch(
//     `https://strangers-things.herokuapp.com/api/COHORT-NAME/posts/${postId}/${messages}`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${getToken()}`,
//       },
//       body: JSON.stringify({
//         message: {
//           content: content,
//         },
//       }),
//     }
//   )
//     .then((response) => response.json())
//     .then((result) => {
//       console.log(result);
//     })
//     .catch(console.error);
// }

// function openForm() {
//   if (document.getElementById("myForm")) {
//     document.getElementById("myForm").style.display = "block";
//   }

//   function closeForm() {
//     if (document.getElementById("myForm")) {
//       return (document.getElementById("myForm").style.display = "none");
//     }
//   }

//   return (
//     <div className="form-popup" id="myForm">
//       <form className="form-container">
//         <label className="titleLabel" id="wrapper">
//           Title:
//         </label>
//         <input
//           className="titleInput"
//           onChange={(event) => {
//             setTitle(event.target.value);
//           }}
//         ></input>
//         <label className="descriptionLabel" id="wrapper">
//           Content:
//         </label>
//         <input
//           className="descriptionInput"
//           onChange={(event) => {
//             setContent(event.target.value);
//           }}
//         ></input>
//         <button type="submit">Send Message</button>
//         <Main/>
//         {/* <button type="submit" className="btn cancel" onClick={closeForm}>
//           Close
//         </button> */}
//       </form>
//     </div>
//   );
// }

const Posts = ({ authenticate }) => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://strangers-things.herokuapp.com/api/2010-LSU-RM-WEB-PT/posts")
      .then((response) => response.json())
      .then((result) => {
        setPosts(result.data.posts);
        console.log(result);
      })
      .catch(console.error);
  }, []);

  // function searchPosts(event) {
  //   console.log(posts);
  //   event.preventDefault();
  //   posts
  //     .filter((post) => {
  //       if (post.description === event.target.value) {
  //         return post;
  //       }
  //     })
  //     .map((filteredPost) => setPosts(filteredPost));
  //   // });
  // }

  const handleChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
    const newPosts = posts.filter((post) => {
      if (post.title === searchTerm) {
        return post;
      }
    });
    setPosts(newPosts);
  };

  return (
    <div className="postPage">
      <section className="allPosts">
        <form>
          <label className="searchBar"> Search </label>
          <input type="text" value={searchTerm} onChange={handleChange}></input>
        </form>
        <h2> All Posts </h2>
        <section>
          {posts.map((post, index) => {
            return (
              <div className="post" key={index}>
                <h3> {post.author.username} </h3>
                <h4> {post.title} </h4>
                <ul>
                  <li> {post.description} </li>
                  <li> {post.price} </li>
                </ul>
                {authenticate ? <button> Send Message </button> : null}
                {authenticate ? <button>View Messages</button> : null}
              </div>
            );
          })}
        </section>
      </section>
      <MakePostForm posts={posts} setPosts={setPosts} />
    </div>
  );
};

export default Posts;
