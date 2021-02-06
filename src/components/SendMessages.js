import { useState } from "react";
import Modal from "react-modal";
import { getToken } from "../auth";
Modal.setAppElement("#root");
import './SendMessages.css'

const SendMessages = ({ id }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [content, setContent] = useState("");

  function createMessage() {
    
    if (getToken()) {
      fetch(
        `https://strangers-things.herokuapp.com/api/2010-LSU-RM-WEB-PT/posts/${id}/messages`,
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
    
  }
 

  return (
    <div>
      <button onClick={(event) => {
        event.preventDefault();
        setModalIsOpen(true)}}>Send Message</button>
      <Modal 
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'white',
            border: 'solid gold'
          },
          content: {
            position: 'absolute',
            top: '40px',
            left: '40px',
            right: '40px',
            bottom: '40px',
            border: '5px solid gold',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '10px'
          }
        }}
        isOpen={modalIsOpen} >
        <form className="sendMessageForm"onSubmit={createMessage}>
          <label className="contentLabel" id="wrapper">
            Content:
          </label>
          <input
            className="contentInput"
            onChange={(event) => {
              setContent(event.target.value);
            }}
          ></input>
          <button className="submitMessageButton" type="submit">Send Message</button>
          <button className="closeModalButton" onClick={() => setModalIsOpen(false)}>Close</button>
        </form>
      </Modal>
    </div>
  );
};

export default SendMessages;
