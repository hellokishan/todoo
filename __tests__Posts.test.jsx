import { waitFor, render, screen } from "@testing-library/react";
import Posts from "../src/screens/Posts";
import axios from "axios";

jest.mock("axios");

describe("Posts Test", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        {
          userId: 1,
          id: 1,
          title: "test title 1",
          body: "test body 1",
        },
        {
          userId: 1,
          id: 2,
          title: "test title 2",
          body: "test body 2",
        },
      ],
    });
  });

  test("should render the showing posts heading on Posts screen", () => {
    render(<Posts />);
    const title = screen.getByText("Showing Posts");
    expect(title).toBeInTheDocument();
  });

  test("should fetch and render input element", async () => {
    render(<Posts />);

    // Using waitFor to wait for the asynchronous operation to complete
    await waitFor(() => {
      const testPosts = screen.getAllByTestId("posts-test");
      expect(testPosts).toHaveLength(2);
    });
  });
});
