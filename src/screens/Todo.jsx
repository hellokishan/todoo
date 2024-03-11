import React from "react";
import "../App.css";
import useTodoStore from "../utils/store";
import AddTodo from "../components/AddTodo";
import IncompleteTodo from "../components/IncompleteTodo";
import CompleteedTodo from "../components/CompletedTodo";

export default function Todo() {
  const { incompleteTodos, completedTodos } = useTodoStore();
  return (
    <>
      <AddTodo />
      <p>Incomplete {incompleteTodos?.length}</p>
      <IncompleteTodo />

      <p>Completed {completedTodos?.length}</p>
      <CompleteedTodo />
    </>
  );
}
