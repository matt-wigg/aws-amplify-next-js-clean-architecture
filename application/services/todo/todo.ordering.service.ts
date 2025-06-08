import type { Todo } from "@domain/models/Todo";

/**
 * Computes the next available order value for a new todo item.
 * Uses the highest existing order and increments it by 1 to maintain dense ordering.
 * If any todo has a null or undefined order, it's treated as 0.
 *
 * @param todos - List of existing todos.
 * @returns The next order value.
 */
export function computeNextTodoOrder(todos: Todo[]): number {
  const maxOrder = Math.max(0, ...todos.map((t) => t.order ?? 0));
  return maxOrder + 1;
}
