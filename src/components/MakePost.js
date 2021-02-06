import { useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");
import { getToken } from "../auth";

const MakePostForm = ({ posts, setPosts }) => {
  const [ modalIsOpen, setModalIsOpen ] = useState(false);
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
    <div>
      <button
        className="makePostButton"
        onClick={(event) => {
          event.preventDefault();
          setModalIsOpen(true);
        }}
      >
        MAKE NEW POST
      </button>
      <Modal
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "white",
            border: "solid gold",
          },
          content: {
            position: "absolute",
            top: "40px",
            left: "40px",
            right: "40px",
            bottom: "40px",
            border: "5px solid gold",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "10px",
          },
        }}
        isOpen={modalIsOpen}
      >
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
      </Modal>
    </div>
  );
};

export default MakePostForm;
