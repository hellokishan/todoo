import { fireEvent, render } from "@testing-library/react";
import App from "../App";
import AddTodo from "../components/AddTodo";

test("should be able to click on goto posts button", () => {
  const { getByText } = render(<App />);
  const gototext = getByText("Goto Posts");
  expect(gototext).toBeInTheDocument();
  fireEvent.click(gototext);
});
test("renders Vite logo with correct alt attribute", () => {
  const { getByAltText } = render(<App />);
  const logoElement = getByAltText("Vite logo");
  expect(logoElement).toBeInTheDocument();
});
test("should be able to find text Todoo", () => {
  const { getByText } = render(<App />);
  const todotext = getByText("Todoo");
  expect(todotext).toBeInTheDocument();
});
test('adds "o" to the title when heading is clicked', () => {
  const { getByText } = render(<App />);
  const heading = getByText("Todoo");
  fireEvent.click(heading);
  const text = getByText("Todooo");
  expect(text).toBeInTheDocument();
});
test("should be able to find add new textfield and also be able to click on add  button", () => {
  const { getByPlaceholderText, getByText } = render(<AddTodo />);
  const addnewtextfield = getByPlaceholderText("Add new");
  expect(addnewtextfield).toBeInTheDocument();
  fireEvent.change(addnewtextfield, { target: { value: "hello" } });
  const addbutton = getByText("Add");
  fireEvent.click(addbutton);
});
