import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import Todo from "./screens/Todo";
import Posts from "./screens/Posts";

function App() {
  const [title, setTitle] = useState("Todoo");
  const [showOther, setShowOther] = useState(false);

  return (
    <div>
      <button onClick={() => setShowOther(!showOther)}>
        Goto {showOther ? "Todo" : "Posts"}
      </button>
      <div className="heading" onClick={() => setTitle(title + "o")}>
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <h2 className="title">{title}</h2>
      </div>
      {showOther ? <Posts /> : <Todo />}
    </div>
  );
}

export default App;
