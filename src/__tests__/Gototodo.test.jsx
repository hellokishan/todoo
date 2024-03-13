import { fireEvent, render } from "@testing-library/react";
import App from "../App";
import Posts from "../screens/Posts";

test("clicking on Goto Posts button changes text", () => {
  const { getByText } = render(<App />);
  const gotopostsButton = getByText("Goto Posts");
  fireEvent.click(gotopostsButton);
  const gotoTodoButton = getByText("Goto Todo");
  fireEvent.click(gotoTodoButton);
});
test("renders Vite logo with correct alt attribute", () => {
  const { getByAltText } = render(<App />);
  const logoElement = getByAltText("Vite logo");
  expect(logoElement).toBeInTheDocument();
});
test("should be able to show showing posts text after clicking on goto posts button", () => {
  const { getByText } = render(<Posts />);
  const gototext = getByText("Showing Posts");
  expect(gototext).toBeInTheDocument();
});
