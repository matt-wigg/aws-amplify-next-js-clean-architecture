import type { Todo } from "@domain/models/Todo";

/**
 * Presenter responsible for formatting or transforming Todo data
 * for UI or API responses.
 */
export const TodoPresenter = {
  /**
   * Sorts the given list of todos by their `order` property in ascending order.
   *
   * @param todos - An array of todos to sort.
   * @returns A new array of todos sorted by order. Returns an empty array if input is empty.
   */
  presentSortedTodos(todos: Todo[]): Todo[] {
    if (todos.length === 0) {
      return [];
    }

    return [...todos].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  },
};
