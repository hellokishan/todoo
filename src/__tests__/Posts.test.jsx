
import { render, waitFor, screen } from "@testing-library/react";
import Posts from "../screens/Posts";
import axios from "axios";

jest.mock("axios");

describe("renders the Posts screen", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [{ id: 0, title: "Test Post 1" }, { id: 1, title: "Test Post 2" }],
    });
  });

  test("should render the showing posts heading on Posts screen", async () => {
    render(<Posts />);
    const title = screen.getByText("Showing Posts");
    expect(title).toBeInTheDocument();
  });

  test("should fetch and render input element", async () => {
   const{getByTestId}= render(<Posts />);
    await waitFor(() => {
      const divElement = getByTestId("item-0");
      expect(divElement).toBeInTheDocument();
    });
  });
});