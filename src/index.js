import {  useState } from "react";
import ReactDOM from "react-dom";
import { Navigation } from "./components";

const App = () => {
  const [authenticate, setAuthentication] = useState(false);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState();

  return (
    <Navigation
      authenticate={authenticate}
      setAuthentication={setAuthentication}
      token={token}
      setToken={setToken}
      username={username}
      setUsername={setUsername}
    />
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
