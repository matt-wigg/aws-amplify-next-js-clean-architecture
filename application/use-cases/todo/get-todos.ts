import type { ITodoRepository } from "@domain/interfaces/todo.repository.interface";
import type { Todo } from "@domain/models/Todo";

/**
 * Retrieves the full list of todos from the repository.
 *
 * @param repo - The Todo repository (injected dependency).
 * @returns A Promise that resolves to an array of todos.
 */
export async function getTodos(repo: ITodoRepository): Promise<Todo[]> {
  return repo.list();
}
