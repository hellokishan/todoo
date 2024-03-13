import React from "react";
import useTodoStore from "../utils/store";
import { GoCheckCircle, GoTrash } from "react-icons/go";

const CompletedTodo = () => {
  const { toggleTodo, completedTodos, removeTodo } = useTodoStore();

  return (
    <div className="todo-container completed">
      {completedTodos.map((item) => {
        return (
          <li
            className="todo-list-item"
            key={item.id}
            onClick={() => toggleTodo(item?.id)}
          >
            <div className="todo-item">
              <p className={`todo-item-text ${item.checked && "cross-text"}`}>
                {item.title}
              </p>
              <div className="todo-item-button">
                <GoCheckCircle style={{ fontSize: 20 }} 
                 data-testid="deleteIcon"/>
               
              </div>

              <div
                className="todo-item-button"
                onClick={() => removeTodo(item?.id)}
              >
                <GoTrash style={{ fontSize: 20 }} />
              </div>
            </div>
          </li>
        );
      })}
    </div>
  );
};

export default CompletedTodo;
