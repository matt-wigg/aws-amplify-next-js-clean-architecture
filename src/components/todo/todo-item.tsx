"use client";

import { useActionState } from "react";
import { LoadingSpinner } from "@nextjs/components/layout/loading-spinner";
import { deleteTodoAction } from "@nextjs/actions/todo.actions";
import type { Todo } from "@domain/models/Todo";

/**
 * Displays a single todo item with a delete button.
 *
 * @param todo - The todo to render.
 */
export function TodoItem({ todo }: { todo: Todo }) {
  const [result, deleteTodo, isPending] = useActionState(
    deleteTodoAction,
    undefined
  );

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

      {result?.error && (
        <p id="todo-item-error" className="text-sm text-destructive">
          {result.error}
        </p>
      )}
    </li>
  );
}
