import type { Todo } from "@domain/models/Todo";

/**
 * Computes the next available order value for a new todo item.
 * Uses the highest existing order and adds an increment of 1000.
 * If any todo has a null or undefined order, it's treated as 0.
 *
 * @param todos - List of existing todos.
 * @returns The next order value.
 */
export function computeNextTodoOrder(todos: Todo[]): number {
  const maxOrder = todos.reduce((max, todo) => {
    const order = todo.order ?? 0;
    return order > max ? order : max;
  }, 0);

  return maxOrder + 1000;
}
