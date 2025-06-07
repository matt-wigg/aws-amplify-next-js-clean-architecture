import { computeNextTodoOrder } from "@application/services/todo/todo.ordering.service";
import type { ITodoRepository } from "@domain/interfaces/todo.repository.interface";
import type { Todo } from "@domain/models/Todo";

/**
 * Creates a new todo with auto-assigned order based on the highest existing order.
 *
 * @param repo - The Todo repository (injected dependency).
 * @param content - The content for the new todo item.
 * @returns The newly created Todo.
 */
export async function createTodo(
  repo: ITodoRepository,
  content: string
): Promise<Todo> {
  const todos: Todo[] = await repo.list();
  const nextTodoOrder: number = computeNextTodoOrder(todos);
  return await repo.create({ content, order: nextTodoOrder });
}
