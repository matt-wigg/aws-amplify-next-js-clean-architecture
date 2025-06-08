"use client";

import { useRef, useState, useEffect, useActionState } from "react";
import { createPortal } from "react-dom";
import invariant from "tiny-invariant";
import { GripVertical } from "lucide-react";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { pointerOutsideOfPreview } from "@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview";
import {
  attachClosestEdge,
  extractClosestEdge,
  type Edge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { deleteTodoAction } from "@nextjs/actions/todo.actions";
import { LoadingSpinner } from "@nextjs/components/layout/loading-spinner";
import type { Todo } from "@domain/models/Todo";

interface DraggableTodoItemProps {
  todo: Todo;
  setActiveDropTarget: (id: string | null, edge: Edge | null) => void;
}

type ElementState =
  | { type: "idle" }
  | { type: "preview"; container: HTMLElement }
  | { type: "is-dragging" }
  | { type: "is-dragging-over"; closestEdge: Edge | null };

const idle: ElementState = { type: "idle" };

const stateStyles: Record<string, string> = {
  "is-dragging": "opacity-40",
};

/**
 * Client component for rendering a draggable and droppable todo item.
 *
 * @param todo - The todo item to render.
 * @param setActiveDropTarget - Callback to set active drop target for reordering.
 * @returns A draggable list item with delete support.
 */
export function DraggableTodoItem({
  todo,
  setActiveDropTarget,
}: DraggableTodoItemProps) {
  const elementRef = useRef<HTMLLIElement>(null);
  const [state, setState] = useState<ElementState>(idle);
  const [result, deleteTodo, isPending] = useActionState(
    deleteTodoAction,
    undefined
  );

  useEffect(() => {
    const element = elementRef.current!;
    invariant(element);

    return combine(
      // Enable dragging this element
      draggable({
        element,
        getInitialData() {
          return { type: "todo", todoId: todo.id, content: todo.content };
        },
        onGenerateDragPreview({ nativeSetDragImage }) {
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: pointerOutsideOfPreview({ x: "16px", y: "8px" }),
            render({ container }) {
              setState({ type: "preview", container });
            },
          });
        },
        onDragStart() {
          setState({ type: "is-dragging" });
        },
        onDrop() {
          setState(idle);
        },
      }),

      // Register this element as a drop target for other todos
      dropTargetForElements({
        element,
        canDrop({ source }) {
          return source.element !== element && source.data.type === "todo";
        },
        getData({ input }) {
          return attachClosestEdge(
            { type: "todo", todoId: todo.id, content: todo.content },
            { element, input, allowedEdges: ["top", "bottom"] }
          );
        },
        getIsSticky() {
          return true;
        },
        onDragEnter({ self }) {
          const edge = extractClosestEdge(self.data);
          setActiveDropTarget(todo.id, edge);
          setState({ type: "is-dragging-over", closestEdge: edge });
        },
        onDrag({ self }) {
          const edge = extractClosestEdge(self.data);
          setActiveDropTarget(todo.id, edge);
          setState((current) => {
            if (
              current.type === "is-dragging-over" &&
              current.closestEdge === edge
            ) {
              return current;
            }
            return { type: "is-dragging-over", closestEdge: edge };
          });
        },
        onDragLeave() {
          setActiveDropTarget(null, null);
          setState(idle);
        },
        onDrop() {
          setActiveDropTarget(null, null);
          setState(idle);
        },
      })
    );
  }, [todo.id, todo.content, setActiveDropTarget]);

  return (
    <li ref={elementRef} data-todo-id={todo.id} className="flex flex-col gap-1">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div
            className={`todo-item text-sm sm:text-base flex items-center gap-2 hover:cursor-grab transition-opacity duration-200 ${
              stateStyles[state.type as keyof typeof stateStyles] || ""
            }`}
          >
            <span className="text-muted-foreground flex-shrink-0 mt-[2px]">
              <GripVertical size={16} />
            </span>
            <span className="break-words">{todo.content}</span>
          </div>
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
      {state.type === "preview" &&
        createPortal(
          <div className="todo-item border border-solid rounded p-2 bg-card shadow-md max-w-[300px]">
            {todo.content}
          </div>,
          state.container
        )}
    </li>
  );
}
