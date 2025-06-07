import { cookiesClient } from "@infrastructure/utils/amplify.utils";
import type { Todo } from "@domain/models/Todo";
import type { ITodoRepository } from "@domain/interfaces/todo.repository.interface";

/**
 * Implementation of the ITodoRepository interface using the Amplify cookiesClient.
 * Handles all persistence-related operations for the Todo model.
 */
export const todoRepository: ITodoRepository = {
  /**
   * Retrieves the full list of todos from the data source.
   *
   * @returns A Promise that resolves to an array of todos. Returns an empty array on failure.
   */
  async list(): Promise<Todo[]> {
    try {
      const { data } = await cookiesClient.models.Todo.list({});
      return data ?? [];
    } catch (err) {
      console.error("TodoRepository.list error:", err);
      return [];
    }
  },

  /**
   * Creates a new todo in the data source.
   *
   * @param fields - The fields required to create a todo (content and order).
   * @returns A Promise that resolves to the newly created todo.
   * @throws If the creation fails or the response data is missing.
   */
  async create(fields: Pick<Todo, "content" | "order">): Promise<Todo> {
    try {
      const { data } = await cookiesClient.models.Todo.create(fields);
      if (!data) throw new Error("Failed to create todo");
      return data;
    } catch (err) {
      console.error("TodoRepository.create error:", err);
      throw err;
    }
  },

  /**
   * Updates an existing todo in the data source.
   *
   * @param id - The unique identifier of the todo to update.
   * @param updates - The fields to update on the todo.
   * @returns A Promise that resolves to the updated todo.
   * @throws If the update fails or the response data is missing.
   */
  async update(id: string, updates: Partial<Omit<Todo, "id">>): Promise<Todo> {
    try {
      const { data } = await cookiesClient.models.Todo.update({
        id,
        ...updates,
      });
      if (!data) throw new Error("Failed to update todo");
      return data;
    } catch (err) {
      console.error("TodoRepository.update error:", err);
      throw err;
    }
  },

  /**
   * Deletes a todo from the data source by its ID.
   *
   * @param id - The unique identifier of the todo to delete.
   * @returns A Promise that resolves when the todo is deleted.
   * @throws If the deletion fails.
   */
  async delete(id: string): Promise<void> {
    try {
      await cookiesClient.models.Todo.delete({ id });
    } catch (err) {
      console.error("TodoRepository.delete error:", err);
      throw err;
    }
  },
};
