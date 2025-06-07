import type { ITodoRepository } from "@domain/interfaces/todo.repository.interface";

/**
 * Deletes a todo by its unique identifier.
 *
 * @param repo - The Todo repository (injected dependency).
 * @param id - The unique identifier of the todo to delete.
 * @returns A Promise that resolves when the todo is deleted.
 */
export async function deleteTodo(
  repo: ITodoRepository,
  id: string
): Promise<void> {
  await repo.delete(id);
}
