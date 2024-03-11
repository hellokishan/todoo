import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

const useTodoStore = create(
  persist(
    (set) => ({
      todos: [],
      completedTodos: [],
      incompleteTodos: [],

      addTodo: (title) =>
        set((state) => {
          const todoWithDefaults = {
            id: uuidv4(),
            title: title,
            checked: false,
            createdAt: new Date(),
          };

          return {
            todos: [...state.todos, todoWithDefaults],
            incompleteTodos: [...state.incompleteTodos, todoWithDefaults],
          };
        }),

      toggleTodo: (id) =>
        set((state) => {
          const updatedTodos = state.todos.map((todo) =>
            todo.id === id
              ? {
                  ...todo,
                  checked: !todo.checked,
                  completedAt: !todo.checked ? new Date() : null,
                }
              : todo
          );

          return {
            todos: updatedTodos,
            completedTodos: updatedTodos.filter((todo) => todo.completedAt),
            incompleteTodos: updatedTodos.filter((todo) => !todo.completedAt),
          };
        }),

      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
          completedTodos: state.completedTodos.filter((todo) => todo.id !== id),
          incompleteTodos: state.incompleteTodos.filter(
            (todo) => todo.id !== id
          ),
        })),
    }),
    {
      name: "todo-store",
      getStorage: () => localStorage,
    }
  )
);

export default useTodoStore;
