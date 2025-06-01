"use server";

import { cookiesClient } from "@/utils/amplify.utils";
import type { Todo } from "@/types/todo.types";

/**
 * Fetches the list of Todo items from the database.
 *
 * @returns An array of Todo items, or an empty array if none found
 */
export async function getTodos(): Promise<Todo[]> {
  try {
    const { data } = await cookiesClient.models.Todo.list();
    return data || [];
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    return [];
  }
}

/**
 * Creates a new Todo item in the database.
 *
 * @param content - The content of the new Todo item
 */
export async function createTodoInDb(content: string): Promise<void> {
  try {
    await cookiesClient.models.Todo.create({ content });
  } catch (error) {
    console.error("Failed to create todo:", error);
  }
}

/**
 * Deletes a Todo item from the database by ID.
 *
 * @param id - The unique identifier of the Todo item to delete
 */
export async function deleteTodoFromDb(id: string): Promise<void> {
  try {
    await cookiesClient.models.Todo.delete({ id });
  } catch (error) {
    console.error("Failed to delete todo:", error);
  }
}
