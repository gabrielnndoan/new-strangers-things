import { useState } from 'react';
import ReactDOM from "react-dom";
import {
    Navigation
  } from './components';



const App = () => {
    const [ authenticate, setAuthentication ] = useState(false)
    return (
        <>
        <Navigation authenticate = { authenticate } setAuthentication = { setAuthentication } />
        </>
       
    )
}


ReactDOM.render(<App />, document.getElementById("root"));