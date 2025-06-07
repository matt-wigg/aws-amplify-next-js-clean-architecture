"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import { flushSync } from "react-dom";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { reorderWithEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge";
import {
  extractClosestEdge,
  type Edge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { DraggableTodoItem } from "@nextjs/components/draggable/draggable-todo-item";
import { DraggableDropIndicator } from "@nextjs/components/draggable/draggable-drop-indicator";
import { updateTodoAction } from "@nextjs/actions/todo.actions";
import type { Todo } from "@domain/models/Todo";

export function DraggableTodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [activeDropTarget, setActiveDropTarget] = useState<{
    id: string | null;
    edge: Edge | null;
  }>({ id: null, edge: null });
  const todosRef = useRef<Todo[]>(todos);

  useEffect(() => {
    setTodos(initialTodos);
  }, [initialTodos]);

  useEffect(() => {
    todosRef.current = todos;
  }, [todos]);

  const isTodoData = (data: any): data is { todoId: string; type: string } => {
    return data && data.type === "todo" && typeof data.todoId === "string";
  };

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

        const current = todosRef.current;
        const srcIndex = current.findIndex((t) => t.id === sourceData.todoId);
        const tgtIndex = current.findIndex((t) => t.id === targetData.todoId);
        if (srcIndex < 0 || tgtIndex < 0) return;

        const closestEdgeOfTarget = extractClosestEdge(targetData);

        const newTodos = reorderWithEdge({
          list: current,
          startIndex: srcIndex,
          indexOfTarget: tgtIndex,
          closestEdgeOfTarget,
          axis: "vertical",
        });

        flushSync(() => {
          setTodos(newTodos);
        });

        try {
          await Promise.all(
            newTodos.map((todo, index) =>
              updateTodoAction(todo.id, { order: index })
            )
          );
        } catch (err) {
          console.error("Failed to persist reordered todos", err);
        }
      },
    });

    return cleanup;
  }, []);

  const handleSetActiveDropTarget = (id: string | null, edge: Edge | null) => {
    setActiveDropTarget({ id, edge });
  };

  return (
    <ul className="space-y-4">
      <hr className="my-4 border-border" />
      {todos.length > 0 ? (
        <>
          <h2 className="text-lg font-semibold">Your Todos:</h2>
          {todos.map((todo) => {
            const isActive = activeDropTarget.id === todo.id;
            const closestEdge = activeDropTarget.edge;

            return (
              <Fragment key={todo.id}>
                {isActive && closestEdge === "top" && (
                  <DraggableDropIndicator />
                )}
                <DraggableTodoItem
                  todo={todo}
                  setActiveDropTarget={handleSetActiveDropTarget}
                />
                {isActive && closestEdge === "bottom" && (
                  <DraggableDropIndicator />
                )}
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
