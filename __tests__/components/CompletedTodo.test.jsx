import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CompletedTodo from '../../src/components/CompletedTodo';
import useTodoStore from '../../src/utils/store';
import '@testing-library/jest-dom';

jest.mock('../../src/utils/store');

beforeAll(()=>{
  localStorage.clear();
})

describe('CompletedTodo', () => {
  const toggleTodoMock = jest.fn();
  const removeTodoMock = jest.fn();

  const completedTodos = [
    { id: "5e939b4d-08c1-483a-a54b-6cc54e535509", title: 'Buy milk', checked: true },
    { id: "ec835a09-1f54-4552-a3ff-ee273babf209", title: 'Buy bread', checked: true },
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

  test('renders completed todos', () => {
    render(<CompletedTodo />);
    expect(screen.getAllByText('Buy milk')).toHaveLength(1);
    expect(screen.getAllByText('Buy bread')).toHaveLength(1);
  });

  test('calls toggleTodo when todo is clicked', () => {
    render(<CompletedTodo />);
    fireEvent.click(screen.getByText('Buy milk'));
    expect(toggleTodoMock).toHaveBeenCalledWith("5e939b4d-08c1-483a-a54b-6cc54e535509");
  });

  test('calls removeTodo when delete button is clicked', () => {
    render(<CompletedTodo />);
    fireEvent.click(screen.getAllByTestId('delete-icon')[0]);
    expect(removeTodoMock).toHaveBeenCalledWith("5e939b4d-08c1-483a-a54b-6cc54e535509");
  });

  test('renders cross-text class for completed todos', () => {
    render(<CompletedTodo />);
    const completedTodoTexts = screen.getAllByText(/Buy/i);
    completedTodoTexts.forEach((text) => {
      expect(text).toHaveClass('cross-text');
    });
  });

  test('does not render any todos when completedTodos is empty', () => {
    useTodoStore.mockReturnValue({
      toggleTodo: toggleTodoMock,
      completedTodos: [],
      removeTodo: removeTodoMock,
    });
    render(<CompletedTodo />);
    expect(screen.queryByText(/Buy/i)).toBeNull();
  });

  
});