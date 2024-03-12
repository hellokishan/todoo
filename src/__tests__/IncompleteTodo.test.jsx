import useTodoStore from '../../src/utils/store';
import IncompleteTodo from "../components/IncompleteTodo";
import { fireEvent,render } from "@testing-library/react";

jest.mock('../../src/utils/store')

beforeAll(()=>{
  localStorage.clear();
})

describe("renders incomplete todos correctly", () => {
    const toggleTodoMock = jest.fn()
    const incompleteTodos = [
      { id: '1', title: 'Incomplete Todo 1', checked: false},
      { id: '2', title: 'Incomplete Todo 2', checked: false },
      {id:'3', title: 'Incomplete Todo 3', checked: true},
      { id: '4', title: 'Incomplete Todo 4', checked: true},
    ];
    beforeEach(() => {
      useTodoStore.mockReturnValue({ toggleTodo: toggleTodoMock ,incompleteTodos,});
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('should call toggleTodo when incomplete todo is clicked', () => {
      const {getByText} = render(<IncompleteTodo/>);
      fireEvent.click(getByText('Incomplete Todo 1'));
      expect(toggleTodoMock).toHaveBeenCalled;
    });
  
    test("should not render any todos when checked true", ()=>{
      const {queryByText} = render(<IncompleteTodo/>);
      expect(queryByText('Completed Task')).toBeNull();
    })
  
    test("should not render cross line for incomplete todos", () => {
      const {getAllByText} = render(<IncompleteTodo/>);
      const incompleteTodoTexts = getAllByText(/Incomplete Todo/i);
      incompleteTodoTexts.forEach((text) => {
        expect(text).not.toHaveClass('todo-item-textcross-text');
      });
    });
  
  });
  