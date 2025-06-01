"use client";

import { useActionState } from "react";
import { LoadingSpinner } from "@/components/loading-spinner";
import { deleteTodoAction } from "@/actions/todo.actions";
import type { Todo } from "@/types/todo.types";

/**
 * Renders a single Todo item with delete functionality.
 *
 * @param todo - The todo item to display
 */
export function TodoItem({ todo }: { todo: Todo }) {
  const [message, deleteTodo, isPending] = useActionState(deleteTodoAction, {
    error: "",
  });

  return (
    <li className="flex flex-col gap-1">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="todo-item text-sm sm:text-base">{todo.content}</div>
        </div>
        <form action={deleteTodo} className="shrink-0">
          <input type="hidden" name="id" value={todo.id} />
          <button
            type="submit"
            className="destructive-button"
            disabled={isPending}
            aria-disabled={isPending}
            aria-label="Delete Todo"
          >
            {isPending ? (
              <>
                <LoadingSpinner />
                <span className="truncate">Deleting…</span>
              </>
            ) : (
              "Delete"
            )}
          </button>
        </form>
      </div>
      {message?.error && (
        <p id="todo-item-error" className="text-sm text-destructive">
          {message.error}
        </p>
      )}
    </li>
  );
}
