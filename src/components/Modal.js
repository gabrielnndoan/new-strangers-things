import { useState, useEffect } from "react";



const Modal = () => {
  const [container, setContainer] = useState();

  useEffect(() => {
    const container = document.createElement("div");
    setContainer(container);
    document.appendChild(container);
  }, []);
  return (
    <form>
      <label className="titleLabel" id="wrapper">
        Title:
      </label>
      <input
        className="titleInput"
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      ></input>
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
    </form>
  );
};

const Main = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      {showModal && <Modal />}
    </div>
  );
};

export default Main