import { createTodo } from "@application/use-cases/todo/create-todo";
import { deleteTodo } from "@application/use-cases/todo/delete-todo";
import { updateTodo } from "@application/use-cases/todo/update-todo";
import { getTodos } from "@application/use-cases/todo/get-todos";
import { todoRepository } from "@infrastructure/repositories/todo.repository";
import type { Todo } from "@domain/models/Todo";

/**
 * Controller responsible for handling Todo operations from external interfaces (e.g., routes, APIs).
 * Delegates business logic to use cases and manages data flow.
 */
export const TodoController = {
  /**
   * Creates a new todo item.
   *
   * @param content - The textual content of the todo item.
   * @returns A Promise that resolves when the todo is created.
   */
  async create(content: string): Promise<void> {
    await createTodo(todoRepository, content);
  },

  /**
   * Deletes an existing todo by its ID.
   *
   * @param id - The unique identifier of the todo to delete.
   * @returns A Promise that resolves when the todo is deleted.
   */
  async delete(id: string): Promise<void> {
    await deleteTodo(todoRepository, id);
  },

  /**
   * Updates an existing todo by its ID.
   *
   * @param id - The unique identifier of the todo to update.
   * @param updates - The fields to update on the todo item.
   * @returns A Promise that resolves to the updated todo.
   */
  async update(id: string, updates: Partial<Omit<Todo, "id">>): Promise<Todo> {
    return await updateTodo(todoRepository, id, updates);
  },

  /**
   * Retrieves the full list of todos.
   *
   * @returns A Promise that resolves to an array of todo items.
   */
  async getTodos(): Promise<Todo[]> {
    return getTodos(todoRepository);
  },
};
