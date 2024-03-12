import { fireEvent,render,screen } from "@testing-library/react";
import Todo from "../screens/Todo";
// import useTodoStore from '../utils/store';

// jest.mock('../utils/store', () => ({
//   __esModule: true,
//   default: jest.fn(),
// }));

describe("renders the Todoo screen", () => {
  test("should render the Addnew input Field and Add button", () => {
    const { getByPlaceholderText, getByRole } = render(<Todo />);
    const addNewField = getByPlaceholderText("Add new");
    expect(addNewField).toBeInTheDocument();

    const addButton = getByRole("button", { name: "Add" });
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);
  });

  test("should be able to type in the Addnew input Field", () => {
    const { getByPlaceholderText } = render(<Todo />);
    const inputField = getByPlaceholderText("Add new");
    fireEvent.change(inputField, { target: { value: "test" } });
    expect(inputField.value).toBe("test");
  });

  test("should render the Incomplete and Completed heading", () => {
    const { getByText } = render(
    <Todo />
    );
    const incompleteHeading = getByText("Incomplete 0");
    expect(incompleteHeading).toBeInTheDocument();
    const completeHeading= getByText("Completed 0");
    expect(completeHeading).toBeInTheDocument();
  });

  const addTodoo= (todoo) => {
    const inputElement = screen.getByPlaceholderText("Add new");
    const buttonElement = screen.getByRole("button", { name:"Add"});
    todoo.forEach((test) => {
        fireEvent.change(inputElement, { target: { value: test } });
        fireEvent.click(buttonElement);
    })
}

test('should be able to type into input field and add into the incomplete list', () => {
    const {getByText} = render(
        <Todo />
    );
    addTodoo(["Software Testing"])
    const divElement = getByText("Software Testing");
    expect(divElement).toBeInTheDocument()
});

test('should render multiple items in the incomplete list', () => {
    const{getAllByTestId} =render(
        <Todo />
    );
    addTodoo(["Software Testing 1", "Software Testing 2", "Software Testing 3"])
    const divElements = getAllByTestId("Software-Testing");
    expect(divElements.length).toBe(4)
});

// test('Renders incomplete todos correctly', () => {
//   const incompleteTodos = [
//     { id: '1', title: 'Incomplete Todo 1', checked: false },
//     { id: '2', title: 'Incomplete Todo 2', checked: false },
//   ];
//   useTodoStore.mockReturnValue({ incompleteTodos, toggleTodo: jest.fn() });

//   const { getByText } = render(<Todo />);
//   expect(getByText('Incomplete Todo 1')).toBeInTheDocument();
//   expect(getByText('Incomplete Todo 2')).toBeInTheDocument();
// });
});

