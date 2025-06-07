"use server";

import { TodoController } from "@interface-adapters/controllers/todo/todo.controller";
import { TodoPresenter } from "@interface-adapters/presenters/todo/todo.presenter";
import { TodoItem } from "@nextjs/components/todo/todo-item";
import type { Todo } from "@domain/models/Todo";

/**
 * Server component that fetches, sorts, and renders the list of todos.
 *
 * @returns A rendered list of todos or fallback content on error/empty state.
 */
export async function TodoList() {
  try {
    const todos: Todo[] = await TodoController.getTodos();
    const sortedTodos = TodoPresenter.presentSortedTodos(todos);

    return (
      <ul className="space-y-4">
        <hr className="my-4 border-border" />
        {sortedTodos.length > 0 ? (
          <>
            <h2 className="text-lg font-semibold">Your Todos:</h2>
            {sortedTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </>
        ) : (
          <li className="text-muted-foreground">No todos found.</li>
        )}
      </ul>
    );
  } catch (error) {
    console.error("TodoList rendering error:", error);
    return (
      <ul className="space-y-4">
        <li className="text-destructive">Failed to load todos.</li>
      </ul>
    );
  }
}
