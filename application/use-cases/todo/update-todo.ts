import type { ITodoRepository } from "@domain/interfaces/todo.repository.interface";
import type { Todo } from "@domain/models/Todo";

/**
 * Updates fields of a todo identified by its ID.
 *
 * @param repo - The Todo repository (injected dependency).
 * @param id - The unique identifier of the todo to update.
 * @param updates - A partial object containing the fields to update, excluding the ID.
 * @returns A Promise that resolves when the todo is updated.
 */
export async function updateTodo(
  repo: ITodoRepository,
  id: string,
  updates: Partial<Omit<Todo, "id">>
): Promise<Todo> {
  return await repo.update(id, updates);
}
