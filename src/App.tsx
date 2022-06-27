import React, { useEffect } from "react";
import "./App.css";
import Checkboxes from "./checkboxes/Checkboxes";

function App() {
  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
  return (
    <div className="App">
      <Checkboxes />
    </div>
  );
}

export default App;
