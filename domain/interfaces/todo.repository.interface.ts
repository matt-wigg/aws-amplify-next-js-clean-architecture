import type { Todo } from "@domain/models/Todo";

export interface ITodoRepository {
  list(): Promise<Todo[]>;
  create(data: Pick<Todo, "content" | "order">): Promise<Todo>;
  update(id: string, updates: Partial<Omit<Todo, "id">>): Promise<Todo>;
  delete(id: string): Promise<void>;
}
