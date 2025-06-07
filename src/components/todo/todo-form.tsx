"use client";

import { useActionState } from "react";
import { addTodoAction } from "@nextjs/actions/todo.actions";
import { LoadingSpinner } from "@nextjs/components/layout/loading-spinner";

/**
 * Client component for creating a new todo item.
 * Handles optimistic UI and error display during submission.
 */
export function TodoForm() {
  const [result, addTodo, isPending] = useActionState(addTodoAction, undefined);

  return (
    <form action={addTodo} className="flex flex-col gap-2">
      <div className="flex gap-4">
        <input
          type="text"
          name="content"
          placeholder="Enter your todo here"
          className="input-field"
          disabled={isPending}
          maxLength={255}
          required
          aria-label="Todo content"
        />

        <button
          type="submit"
          className="primary-button"
          disabled={isPending}
          aria-disabled={isPending}
        >
          {isPending ? (
            <>
              <LoadingSpinner />
              Adding...
            </>
          ) : (
            "Add"
          )}
        </button>
      </div>

      {result?.error && (
        <p id="todo-form-error" className="text-destructive text-sm">
          {result.error}
        </p>
      )}
    </form>
  );
}
