import { fireEvent,render } from "@testing-library/react";
import App from "../App";

describe("renders the whole Todoo App", () => {
  test("should render the Vite image and Todoo title", () => {
    const { getByRole, getByAltText } = render(<App />);
    const viteImage = getByAltText("Vite logo");
    expect(viteImage).toBeInTheDocument();

    const title = getByRole("heading", { name: "Todoo" });
    expect(title).toBeInTheDocument();
  });

  test("should increment the letter 'o' in title on click", () => {
    const { getByText } = render(<App />);
    const heading = getByText("Todoo");
    fireEvent.click(heading);
    const title = getByText("Todooo");
    expect(title).toBeInTheDocument();
  });

  test("should have goto posts button and display the showing posts list on click",()=>{
    const { getByRole,getByText} = render(<App />);
    const button = getByRole("button",{name:"Goto Posts"});
    expect(button).toBeInTheDocument();
    fireEvent.click(button)
    expect(getByText("Showing Posts")).toBeInTheDocument();
  })

  test("should have goto todo button and display the add new todo input field on click",()=>{
    const { getByRole,getByPlaceholderText} = render(<App />);
    const postsbutton = getByRole("button",{name:"Goto Posts"});
    fireEvent.click(postsbutton)
    const todobutton = getByRole("button",{name:"Goto Todo"});
    expect(todobutton).toBeInTheDocument();
    fireEvent.click(todobutton)
    expect(getByPlaceholderText("Add new")).toBeInTheDocument();
  })

  test("should show window alert when add button is clicked with empty field", () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const{getByPlaceholderText,getByText}=render(<App/>);
    const inputField =getByPlaceholderText('Add new');
    const addButton = getByText('Add');
    fireEvent.change(inputField, { target: { value: '' } });
    fireEvent.click(addButton);
    expect(alertMock).toHaveBeenCalledWith('someting went wrong');
    alertMock.mockRestore();
  });
});
