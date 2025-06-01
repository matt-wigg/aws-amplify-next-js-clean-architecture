"use server";

import { revalidatePath } from "next/cache";
import { createTodoInDb, deleteTodoFromDb } from "@/services/todo.services";
import { ROUTES } from "@/constants/routes.constants";
import type { ActionState } from "@/types/action.types";

/**
 * Handles server-side creation of a new todo item.
 *
 * @param _prevState - Previous form action state (unused here)
 * @param formData - FormData containing the 'content' field
 * @returns ActionState with success or error message
 */
export async function addTodoAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const content = (formData.get("content") ?? "").toString().trim();

  if (!content) {
    return { error: "Todo content is required." };
  }

  try {
    await createTodoInDb(content);
    revalidatePath(ROUTES.INTERNAL.WELCOME);
    return { success: true };
  } catch (error) {
    console.error("addTodoAction error:", error);
    return { error: "Failed to add todo." };
  }
}

/**
 * Handles server-side deletion of a todo item by ID.
 *
 * @param _prevState - Previous form action state (unused here)
 * @param formData - FormData containing the 'id' field
 * @returns ActionState with success or error message
 */
export async function deleteTodoAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const id = (formData.get("id") ?? "").toString().trim();

  if (!id) {
    return { error: "Todo ID is required." };
  }

  try {
    await deleteTodoFromDb(id);
    revalidatePath(ROUTES.INTERNAL.WELCOME);
    return { success: true };
  } catch (error) {
    console.error("deleteTodoAction error:", error);
    return { error: "Failed to delete todo." };
  }
}
