import React from "react";
import useTodoStore from "../utils/store";
import { GoCircle } from "react-icons/go";

const IncompleteTodo = () => {
  const { toggleTodo, incompleteTodos } = useTodoStore();

  return (
    <div className="todo-container incomplete">
      {incompleteTodos.map((item, index) => {
        return (
          <li className="todo-list-item" key={item.id}>
            <div className="todo-item"
            data-testid="Software-Testing">

              <p className={`todo-item-text ${item.checked && "cross-text"}`}>
                {item.title}
              </p>
              <div
                className="todo-item-button"
                onClick={() => toggleTodo(item.id)}
              >
                <GoCircle style={{ fontSize: 20 }} />
              </div>
            </div>
          </li>
        );
      })}
    </div>
  );
};

export default IncompleteTodo;
