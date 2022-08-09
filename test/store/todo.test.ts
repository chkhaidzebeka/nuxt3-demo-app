import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useTodoStore } from "../../store/todo";

beforeAll(() => {
  const pinia = createPinia();
  setActivePinia(pinia);
});

describe("useTodoStore", () => {
  let store: ReturnType<typeof useTodoStore>;

  beforeEach(() => {
    store = useTodoStore();
  });

  afterEach(() => {
    store.$reset();
  });

  test("it creates a store", () => {
    expect(store).toBeDefined();
  });

  test("initializes with empty store", () => {
    expect(store.todos).toStrictEqual([]);
  });

  test("creates new item", () => {
    const title = "newly added item";
    store.add(title);
    expect(store.todos[0].title).toStrictEqual(title);
  });

  test("gets by id", () => {
    const title = "newly added item";
    store.add(title);

    const item = store.todos[0];
    const todo = store.getById(item.id);

    expect(item).toStrictEqual(todo);
  });

  test("gets ordered todos", () => {
    const items = [
      {
        createdAt: new Date(2022, 2, 14),
      },
      {
        createdAt: new Date(2024, 2, 14),
      },
      {
        createdAt: new Date(2020, 2, 14),
      },
    ];

    // @ts-ignore
    store.todos = items;

    const orderedTodos = store.getOrderedTodos;

    expect(orderedTodos[0].createdAt.getFullYear()).toBe(2020);
    expect(orderedTodos[1].createdAt.getFullYear()).toBe(2022);
    expect(orderedTodos[2].createdAt.getFullYear()).toBe(2024);
  });

  test("removes a todo", () => {
    const title = "newly added item";
    store.add(title);
    const item = store.todos[0];
    const { id } = item;

    expect(store.todos.length).toBe(1);
    store.remove(id);
    expect(store.todos.length).toBe(0);
  });

  test("updates todo", () => {
    const title = "newly added item";
    store.add(title);
    const item = store.todos[0];

    store.update(item.id, { done: true });

    expect(store.todos[0].done).toBe(true);
  });

  test("doesn't add duplicate todo", () => {
    const title = "newly added item";
    store.add(title);
    store.add(title);

    expect(store.todos.length).toBe(1);
  });
});
