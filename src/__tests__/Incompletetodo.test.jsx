import React from "react";
import { render } from "@testing-library/react";
import IncompleteTodo from "../../src/components/IncompleteTodo";
import useTodoStore from "../../src/utils/store";

jest.mock("../../src/utils/store");
const toggleTodo = jest.fn();
const incompleteTodos = [{ id: "1", title: "Todo 1", checked: false }];
beforeEach(() => {
  useTodoStore.mockReturnValue({
    toggleTodo,
    incompleteTodos,
  });
});
test("should be abe to find todo text", () => {
  const { getByText } = render(<IncompleteTodo />);
  const text = getByText("Todo 1");
  expect(text).toBeInTheDocument();
});

test("should not be able to render cross line for incomplete todo", () => {
  const { getByText } = render(<IncompleteTodo />);
  const incompleteTodotext = getByText(/Todo 1/i);
  expect(incompleteTodotext).not.toHaveClass("todo-item-textcross-text");
});
