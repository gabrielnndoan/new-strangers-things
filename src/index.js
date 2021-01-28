import ReactDOM from "react-dom";
import {
    Navigation
  } from './components';



const App = () => {
    return (
        <>
        <Navigation />
        {/* <Home/> */}
        </>
       
    )
}


ReactDOM.render(<App />, document.getElementById("root"));