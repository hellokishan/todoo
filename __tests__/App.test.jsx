import { fireEvent,render,screen } from "@testing-library/react";
import App from "../src/App";

jest.mock("axios");

beforeAll(()=>{
    localStorage.clear();
  })

  describe("renders App", () => {
    test("should render the  image and Todoo title", () => {
      const { getByRole, getByAltText } = render(<App />);
      const image = getByAltText("Vite logo");
      expect(image).toBeInTheDocument();
  
      const title = getByRole("heading", { name: "Todoo" });
      expect(title).toBeInTheDocument();
    });
  
    test("should increment the letter 'o' in title on click", () => {
        const { getByText } = render(<App />);
        const heading = getByText("Todoo");
        
        const randomClicks = Math.floor(Math.random() * 10) + 1; // Generates a random number between 1 and 10
        
        for (let i = 0; i < randomClicks; i++) {
          fireEvent.click(heading);
        }
        const updatedTitle = 'Todoo' + 'o'.repeat(randomClicks);
        const title = getByText(updatedTitle);
        expect(title).toBeInTheDocument();
      });
      
      test("should show posts list after clicking 'Goto Posts' button", () => {
        render(<App />);
        const gotoPostsButton = screen.getByRole("button", { name: "Goto Posts" });
        expect(gotoPostsButton).toBeInTheDocument();
        fireEvent.click(gotoPostsButton);
        expect(screen.getByText("Showing Posts")).toBeInTheDocument();
      });
      
      test("should display add new todo input field after clicking 'Goto Todo' button", () => {
        render(<App />);
        const gotoPostsButton = screen.getByRole("button", { name: "Goto Posts" });
        fireEvent.click(gotoPostsButton);
        const gotoTodoButton = screen.getByRole("button", { name: "Goto Todo" });
        expect(gotoTodoButton).toBeInTheDocument();
        fireEvent.click(gotoTodoButton);
        expect(screen.getByPlaceholderText("Add new")).toBeInTheDocument();
      });
  });

  
