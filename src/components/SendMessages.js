import "./SendMessages.css";
import { useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");
import { getToken } from "../auth";

const SendMessages = ({ id }) => {
  const [ modalIsOpen, setModalIsOpen ] = useState(false);
  const [ content, setContent ] = useState("");

  function createMessage(event) {
    event.preventDefault();
    if (getToken()) {
      fetch(
        `https://strangers-things.herokuapp.com/api/2010-LSU-RM-WEB-PT/posts/${ id }/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ getToken() }`,
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
      <button className="sendMessageButton"
        onClick={(event) => {
          event.preventDefault();
          setModalIsOpen(true);
        }}
      >
      Send Message
      </button>
      <Modal
        style={{
          overlay: {
            position: "fixed",
            top: 350,
            left: 350,
            right: 350,
            bottom: 350,
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
        <form className="sendMessageForm" onSubmit={ createMessage }>
          <label className="contentLabel" id="wrapper">
            Content:
          </label>
          <input
            className="contentInput"
            onChange={(event) => {
              setContent(event.target.value);
            }}
          ></input>
          <button className="submitMessageButton" type="submit">
            Send Message
          </button>
          <button
            className="closeModalButton"
            onClick={() => setModalIsOpen(false)}
          >
            Close
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default SendMessages;