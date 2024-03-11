import React, { useState } from "react";
import useTodoStore from "../utils/store";

export default function AddTodo() {
  const [todoTitle, setTodoTitle] = useState("");
  const { addTodo } = useTodoStore();

  return (
    <div className="todo-input-container">
      <input
        autoFocus
        placeholder="Add new"
        className="todo-input"
        value={todoTitle}
        onKeyDown={(e) => {
          if (e.key === "Enter" && todoTitle.length > 0) {
            console.log("enter");
            addTodo(todoTitle);
            setTodoTitle("");
          }
        }}
        onChange={(e) => setTodoTitle(e.target.value)}
      />
      <button
        className="todo-input-button"
        onClick={() => {
          if (todoTitle.length > 0) {
            addTodo(todoTitle);
            setTodoTitle("");
          } else {
            alert("someting went wrong");
          }
        }}
      >
        Add
      </button>
    </div>
  );
}
