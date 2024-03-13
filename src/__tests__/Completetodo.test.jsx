import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CompletedTodo from "../../src/components/CompletedTodo";
import useTodoStore from "../../src/utils/store";

jest.mock("../../src/utils/store");
const toggleTodo = jest.fn();
const removeTodo = jest.fn();
const completedTodos = [{ id: "1", title: "Todo 1", checked: true }];

beforeEach(() => {
  useTodoStore.mockReturnValue({
    toggleTodo,
    completedTodos,
    removeTodo,
  });
});
test("should be able to find text which was checked from incomplete task", () => {
  const { getByText } = render(<CompletedTodo />);
  const text = getByText("Todo 1");
  expect(text).toBeInTheDocument();
});

test("should render cross line for completed todos text", () => {
  const { getByText } = render(<CompletedTodo />);
  const TodoTexts = getByText(/Todo 1/i);
  expect(TodoTexts).toHaveClass("todo-item-text cross-text");
});

test("should be able to find delete button when delete button is clicked", () => {
  const { getByTestId } = render(<CompletedTodo />);
  const deleteicon=getByTestId("deleteIcon");
  fireEvent.click(deleteicon);
});
