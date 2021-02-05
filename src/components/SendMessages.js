import { useState } from "react";
import Modal from "react-modal";
import { getToken } from "../auth";
Modal.setAppElement("#root");

const SendMessages = ({ posts, postId, setPostId }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [content, setContent] = useState("");
  

  posts.map(post => {
    setPostId(post._id)
  })

  function createMessage(event) {
    event.preventDefault()
    if (getToken()) {
      fetch(
        `https://strangers-things.herokuapp.com/api/2010-LSU-RM-WEB-PT/posts/${postId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            message: {
              content: content,
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
    event.target.reset();
  }

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Send Message</button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <form onSubmit={createMessage}>
          <label className="descriptionLabel" id="wrapper">
            Content:
          </label>
          <input
            className="descriptionInput"
            onChange={(event) => {
              setContent(event.target.value);
            }}
          ></input>
          <button type="submit">Send Message</button>
          <button onClick={() => setModalIsOpen(false)}>Close</button>
        </form>
      </Modal>
    </div>
  );
};

export default SendMessages;
