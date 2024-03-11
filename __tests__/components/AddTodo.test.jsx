import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AddTodo from '../../src/components/AddTodo';
import useTodoStore from '../../src/utils/store';

jest.mock('../../src/utils/store');

beforeAll(()=>{
  localStorage.clear();
})

describe('AddTodo', () => {
  const addTodoMock = jest.fn();

  beforeEach(() => {
    useTodoStore.mockReturnValue({ addTodo: addTodoMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders input field and button', () => {
    render(<AddTodo />);
    expect(screen.getByPlaceholderText('Add new')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Add' })).toBeTruthy();
  });

  test('Add/Calls todo if Add button is clicked', ()=>{
    render(<AddTodo/>);
    const inputField = screen.getByPlaceholderText('Add new');
    const Addbtn = screen.getByText('Add');
    fireEvent.change(inputField, { target: { value: 'Write Program' } });
    fireEvent.click(Addbtn);
    expect(addTodoMock).toHaveBeenCalledWith('Write Program');

  })

  test('Add/Calls todo if {ENTER} key is pressed', ()=>{
    render(<AddTodo />);
    const inputField = screen.getByPlaceholderText('Add new');
    fireEvent.change(inputField, { target: { value: 'Hello Wiseyak' } });
    fireEvent.keyDown(inputField, { key: 'Enter', code: 'Enter' });
    expect(addTodoMock).toHaveBeenCalledWith('Hello Wiseyak');

  })

  test('calls addTodo when button is clicked', () => {
    render(<AddTodo />);
    const inputField = screen.getByPlaceholderText('Add new');
    fireEvent.change(inputField, { target: { value: 'Read RTL Docs' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(addTodoMock).toHaveBeenCalledWith('Read RTL Docs');
  });

  test('does not call/add addTodo when input is empty', () => {
    render(<AddTodo />);
    const inputField = screen.getByPlaceholderText('Add new');
    fireEvent.change(inputField, { target: { value: '' } });
    fireEvent.keyDown(inputField, { key: 'Enter', code: 'Enter' });
    expect(addTodoMock).not.toHaveBeenCalled();
  });

  test('clears input field after adding a todo', () => {
    render(<AddTodo />);
    const inputField = screen.getByPlaceholderText('Add new');
    fireEvent.change(inputField, { target: { value: 'Buy eggs' } });
    fireEvent.keyDown(inputField, { key: 'Enter', code: 'Enter' });
    expect(inputField.value).toBe('');
  });

  test('shows alert when input is empty and {ENTER} is pressed', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<AddTodo />);
    const inputField = screen.getByPlaceholderText('Add new');
    fireEvent.change(inputField, { target: { value: '' } });
    fireEvent.keyDown(inputField, { key: 'Enter', code: 'Enter' });
    expect(alertMock).toHaveBeenCalledWith('someting went wrong');
    alertMock.mockRestore();
  });

  test('shows alert when input is empty Add button is clicked', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<AddTodo />);
    const inputField = screen.getByPlaceholderText('Add new');
    const Addbtn = screen.getByText('Add');
    fireEvent.change(inputField, { target: { value: '' } });
    fireEvent.click(Addbtn);
    expect(alertMock).toHaveBeenCalledWith('someting went wrong');
    alertMock.mockRestore();
  });
 
})