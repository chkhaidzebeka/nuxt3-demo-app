export type TodoType = {
  id: string;
  title: string;
  done: boolean;
  createdAt: Date;
  updatedAt?: Date;
};

export type TodoUpdateType = {
  title?: string;
  done?: boolean;
};

export interface TodoInterface {
  todos: TodoType[];
}
