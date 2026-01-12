import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FetchingData from "./Components/FetchingData";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>HII</h1>
      <FetchingData />
    </>
  );
}

export default App;
