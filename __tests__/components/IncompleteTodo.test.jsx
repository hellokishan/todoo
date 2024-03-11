import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import IncompleteTodo from '../../src/components/IncompleteTodo';
import useTodoStore from '../../src/utils/store';

jest.mock('../../src/utils/store');

beforeAll(()=>{
  localStorage.clear();
})

describe('IncompleteTodo', () => {
  const toggleTodoMock = jest.fn();

  const incompleteTodos = [
    { id: "5e939b4d-08c1-483a-a54b-6cc54e535509", title: 'Buy milk', checked: false },
    { id: "ec835a09-1f54-4552-a3ff-ee273babf209", title: 'Buy bread', checked: false },
    { id: "18d6c61e-6226-42b1-8f37-bfa3ddfd8ed9", title: 'Sell water', checked: true },
    { id: "4e1788c4-268c-4852-adf7-17300a7cc1d8", title: 'Sell fruits', checked: true },

  
  ];

  beforeEach(() => {
    useTodoStore.mockReturnValue({ toggleTodo: toggleTodoMock, incompleteTodos });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders incomplete todos', () => {
    render(<IncompleteTodo />);
    expect(screen.getAllByText('Buy milk')).toHaveLength(1);
    expect(screen.getAllByText('Buy bread')).toHaveLength(1);
  });

  test('calls toggleTodo when todo is clicked', () => {
    render(<IncompleteTodo />);
    fireEvent.click(screen.getByText('Buy milk'));
    expect(toggleTodoMock).toHaveBeenCalledWith("5e939b4d-08c1-483a-a54b-6cc54e535509");
  });

  test('does not render any todos which is checked true', ()=>{
    render(<IncompleteTodo/>);
    expect(screen.queryByText('Sell water')).toBeNull();
    expect(screen.queryByText('Sell fruits')).toBeNull();
  })

  test('does not render cross-text class for incomplete todos', () => {
    render(<IncompleteTodo />);
    const incompleteTodoTexts = screen.getAllByText(/Buy/i);
    incompleteTodoTexts.forEach((text) => {
      expect(text).not.toHaveClass('cross-text');
    });
  });

  test('does not render any todos when incompleteTodos is empty', () => {
    useTodoStore.mockReturnValue({
      toggleTodo: toggleTodoMock,
      incompleteTodos: [],
    });
    render(<IncompleteTodo />);
    expect(screen.queryByText(/Buy/i)).toBeNull();
  });

 
});