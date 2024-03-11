import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AddTodo from '../src/components/AddTodo';
import useTodoStore from '../src/utils/store';

jest.mock('../src/utils/store');

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
})