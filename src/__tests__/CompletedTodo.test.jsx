import { render, fireEvent } from '@testing-library/react';
import CompletedTodo from '../../src/components/CompletedTodo';
import useTodoStore from '../../src/utils/store';

jest.mock('../../src/utils/store');

beforeAll(()=>{
  localStorage.clear();
})

describe('renders completed Todos correctly', () => {
  const toggleTodoMock = jest.fn();
  const removeTodoMock = jest.fn();

  const completedTodos = [
    { id: "1", title: 'Completed Task 1', checked: true },
    { id: "2", title: 'Completed Task 2', checked: true },
  ];

  beforeEach(() => {
    useTodoStore.mockReturnValue({
      toggleTodo: toggleTodoMock,
      completedTodos,
      removeTodo: removeTodoMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render completed todos list', () => {
    const{getByText}= render(<CompletedTodo />);
    expect(getByText('Completed Task 1')).toBeInTheDocument();
  });

  test('should call toggleTodo when todo is clicked', () => {
    const{getByText}=render(<CompletedTodo />);
    fireEvent.click(getByText('Completed Task 1'));
    expect(toggleTodoMock).toHaveBeenCalled();
  });

  test('should call removeTodo when delete button is clicked', () => {
    const{getAllByTestId}=render(<CompletedTodo />);
    fireEvent.click(getAllByTestId('delete-icon')[0]);
    expect(removeTodoMock).toHaveBeenCalledWith("1");
  });

  test('should render cross line for completed todos', () => {
    const{getAllByText}=render(<CompletedTodo />);
    const completedTodoTexts =getAllByText(/Completed Task/i);
    completedTodoTexts.forEach((text) => {
      expect(text).toHaveClass("todo-item-text cross-text");
    });
  });

  test('should not render any todos when completedTodos is empty', () => {
    useTodoStore.mockReturnValue({
      toggleTodo: toggleTodoMock,
      completedTodos: [],
      removeTodo: removeTodoMock,
    });
   const{queryByText}= render(<CompletedTodo />);
    expect(queryByText(/Completed Task/i)).toBeNull();
  });
});