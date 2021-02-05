import { useState } from "react";
import Modal from "react-modal";
import { getToken } from "../auth";
Modal.setAppElement("#root");

const Edit = ({
  posts,
  setPosts,
  postId,
  setPostId,
  title,
  description,
  price,
  setTitle,
  setDescription,
  setPrice,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function editPost() {
    fetch(
      `http://strangers-things.herokuapp.com/api/2010-LSU-RM-WEB-PT/posts/${postId}`,
      {
        method: "PATCH",
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
      })
      .catch(console.error);
  }

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Edit</button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <form className="postForm" onSubmit={editPost}>
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

export default Edit;
