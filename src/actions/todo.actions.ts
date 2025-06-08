"use server";

import { TodoController } from "@interface-adapters/controllers/todo/todo.controller";
import { revalidateTodoPaths } from "@nextjs/utils/action.utils";
import type { ActionResponse } from "@nextjs/types/action.types";
import type { Todo } from "@domain/models/Todo";

/**
 * Server action: Create a new Todo.
 *
 * @param _prevState - Unused state from useActionState.
 * @param formData - Form data containing the todo content.
 * @returns Result object indicating success or failure.
 */
export async function addTodoAction(
  _prevState: ActionResponse | undefined,
  formData: FormData
): Promise<ActionResponse> {
  const content = (formData.get("content") ?? "").toString().trim();

  if (!content) {
    return { success: false, error: "Todo content is required." };
  }

  try {
    await TodoController.create(content);
    await revalidateTodoPaths();
    return { success: true };
  } catch (err) {
    console.error("addTodoAction error:", err);
    return { success: false, error: "Failed to create todo." };
  }
}

/**
 * Server action: Delete a Todo by ID.
 *
 * @param _prevState - Unused state from useActionState.
 * @param formData - Form data containing the todo ID.
 * @returns Result object indicating success or failure.
 */
export async function deleteTodoAction(
  _prevState: ActionResponse | undefined,
  formData: FormData
): Promise<ActionResponse> {
  const id = (formData.get("id") ?? "").toString().trim();

  if (!id) {
    return { success: false, error: "Todo ID is required." };
  }

  try {
    await TodoController.delete(id);
    await revalidateTodoPaths();
    return { success: true };
  } catch (err) {
    console.error("deleteTodoAction error:", err);
    return { success: false, error: "Failed to delete todo." };
  }
}

/**
 * Server action: Update a Todo by ID.
 *
 * @param id - The ID of the todo to update.
 * @param updates - The fields to update (excluding ID).
 * @returns Result object indicating success or failure.
 */
export async function updateTodoAction(
  id: string,
  updates: Partial<Omit<Todo, "id">>
): Promise<ActionResponse> {
  try {
    await TodoController.update(id, updates);
    await revalidateTodoPaths();
    return { success: true };
  } catch (err) {
    console.error("updateTodoAction error:", err);
    return { success: false, error: "Failed to update todo." };
  }
}

/**
 * Server action: Bulk update todo orders.
 *
 * @param updates - Array of { id, order } pairs.
 * @returns Result object indicating success or failure.
 */
export async function reorderTodosAction(
  updates: { id: string; order: number }[]
): Promise<ActionResponse> {
  if (!updates.length) {
    return { success: false, error: "No updates provided." };
  }
  try {
    await Promise.all(
      updates.map(({ id, order }) => TodoController.update(id, { order }))
    );
    await revalidateTodoPaths();
    return { success: true };
  } catch (err) {
    console.error("updateTodosOrderAction error:", err);
    return { success: false, error: "Failed to bulk-update todos." };
  }
}
