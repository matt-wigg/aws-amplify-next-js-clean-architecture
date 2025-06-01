"use client";

import { useActionState } from "react";
import { addTodoAction } from "@/actions/todo.actions";
import { LoadingSpinner } from "@/components/loading-spinner";

/**
 * Renders a form to create a new Todo item.
 */
export function TodoForm() {
  const [message, addTodo, isPending] = useActionState(addTodoAction, {
    error: "",
  });

  return (
    <form action={addTodo} className="flex flex-col gap-2">
      <div className="flex gap-4">
        <input
          type="text"
          name="content"
          placeholder="Enter your todo here"
          className="input-field"
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
      {message?.error && (
        <p id="todo-form-error" className="text-destructive text-sm">
          {message.error}
        </p>
      )}
    </form>
  );
}
