import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";
import { TodoInterface, TodoUpdateType, TodoType } from "~~/types/store/todo";

const state = (): TodoInterface => ({
  todos: [],
});

const isDuplicate = (title: string, array: TodoInterface) => {
  return array.todos.some((item) => item.title === title);
};

const actions = {
  add(title: string) {
    const self: TodoInterface = this;

    if (isDuplicate(title, self))
      return console.warn(`todo with title ${title} already exists`);

    const newTodo: TodoType = {
      id: uuid(),
      title,
      done: false,
      createdAt: new Date(),
    };

    self.todos.push(newTodo);
  },

  remove(id: string) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  },

  update(id: string, update: TodoUpdateType) {
    this.todos = this.todos.map((item) =>
      item.id == id ? { ...item, ...update, updatedAt: new Date() } : item
    );
  },
};

const getters = {
  getById: (state: TodoInterface) => (id: string) => {
    return state.todos.find((todo) => todo.id === id);
  },

  getOrderedTodos: (state: TodoInterface) => {
    return [...state.todos].sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
    );
  },
};

export const useTodoStore = defineStore({
  id: "todo",
  state,
  actions,
  getters,
});
