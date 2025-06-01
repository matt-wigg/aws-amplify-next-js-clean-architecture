"use server";

import { cookiesClient } from "@/utils/amplify.utils";
import { TodoItem } from "@/components/todo/todo-item";
import type { Todo } from "@/types/todo.types";

/**
 * Server component that fetches and renders the list of Todo items.
 *
 * @returns A rendered list of todos or fallback content if none exist
 */
export async function TodoList() {
  try {
    const { data: todos = [] } = (await cookiesClient.models.Todo.list()) as {
      data: Todo[];
    };

    return (
      <ul className="space-y-4">
        <hr className="my-4 border-border" />
        {todos.length > 0 ? (
          <>
            <h2 className="text-lg font-semibold">Your Todos:</h2>
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </>
        ) : (
          <li className="text-muted-foreground">No todos found.</li>
        )}
      </ul>
    );
  } catch (error) {
    console.error("Failed to load todos:", error);
    return (
      <ul className="space-y-4">
        <li className="text-destructive">Failed to load todos.</li>
      </ul>
    );
  }
}
