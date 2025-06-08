"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import { flushSync } from "react-dom";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { reorderWithEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge";
import {
  extractClosestEdge,
  type Edge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { DraggableTodoItem } from "./draggable-todo-item";
import { DraggableDropIndicator } from "./draggable-drop-indicator";
import { reorderTodosAction } from "@nextjs/actions/todo.actions";
import type { Todo } from "@domain/models/Todo";

/**
 * Client component that renders a sortable list of todos.
 * Handles drag-and-drop reordering and persists the new order to the server.
 *
 * @param initialTodos - List of todos to render in their initial order.
 * @returns A draggable list UI for todos.
 */
export function DraggableTodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [activeDropTarget, setActiveDropTarget] = useState<{
    id: string | null;
    edge: Edge | null;
  }>({ id: null, edge: null });

  const todosRef = useRef<Todo[]>(todos);
  useEffect(() => {
    todosRef.current = todos;
  }, [todos]);

  const pendingUpdates = useRef<{ id: string; order: number }[] | null>(null);

  useEffect(() => {
    const onNativeDragEnd = () => {
      if (pendingUpdates.current) {
        reorderTodosAction(pendingUpdates.current);
        pendingUpdates.current = null;
      }
    };

    document.addEventListener("dragend", onNativeDragEnd);
    return () => {
      document.removeEventListener("dragend", onNativeDragEnd);
    };
  }, []);

  const isTodoData = (data: any): data is { todoId: string; type: string } =>
    data?.type === "todo" && typeof data.todoId === "string";

  useEffect(() => {
    const cleanup = monitorForElements({
      canMonitor({ source }) {
        return isTodoData(source.data);
      },

      async onDrop({ location, source }) {
        const target = location.current.dropTargets[0];
        if (!target) return;

        const sourceData = source.data;
        const targetData = target.data;
        if (!isTodoData(sourceData) || !isTodoData(targetData)) return;

        const list = todosRef.current;
        const from = list.findIndex((t) => t.id === sourceData.todoId);
        const to = list.findIndex((t) => t.id === targetData.todoId);
        if (from < 0 || to < 0) return;

        const edge = extractClosestEdge(targetData);
        const newList = reorderWithEdge({
          list,
          startIndex: from,
          indexOfTarget: to,
          closestEdgeOfTarget: edge,
          axis: "vertical",
        });

        // Apply UI change immediately for responsiveness
        flushSync(() => setTodos(newList));

        // Store update payload to be sent once drag completes
        pendingUpdates.current = newList.map((todo, index) => ({
          id: todo.id,
          order: index,
        }));

        setActiveDropTarget({ id: null, edge: null });
      },
    });

    return cleanup;
  }, []);

  const handleSetActiveDropTarget = (id: string | null, edge: Edge | null) => {
    setActiveDropTarget({ id, edge });
  };

  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <ul className="space-y-4">
      <hr className="my-4 border-border" />
      {todos.length ? (
        <>
          <h2 className="text-lg font-semibold">Your Todos:</h2>
          {todos.map((todo) => {
            const isActive = activeDropTarget.id === todo.id;
            const edge = activeDropTarget.edge;
            return (
              <Fragment key={todo.id}>
                {isActive && edge === "top" && <DraggableDropIndicator />}
                <DraggableTodoItem
                  todo={todo}
                  setActiveDropTarget={handleSetActiveDropTarget}
                  onDelete={handleDelete}
                />
                {isActive && edge === "bottom" && <DraggableDropIndicator />}
              </Fragment>
            );
          })}
        </>
      ) : (
        <li className="text-muted-foreground">No todos found.</li>
      )}
    </ul>
  );
}
