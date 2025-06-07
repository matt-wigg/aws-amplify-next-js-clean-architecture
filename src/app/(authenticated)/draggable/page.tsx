"use server";

import { SessionController } from "@interface-adapters/controllers/session/session.controller";
import { SessionPresenter } from "@interface-adapters/presenters/session/session.presenter";
import { TodoController } from "@interface-adapters/controllers/todo/todo.controller";
import { TodoPresenter } from "@interface-adapters/presenters/todo/todo.presenter";
import { TodoForm } from "@nextjs/components/todo/todo-form";
import { DraggableTodoList } from "@nextjs/components/draggable/draggable-todo-list";

export default async function DraggablePage() {
  const user = await SessionController.getCurrentUser();
  const loginId = SessionPresenter.presentUserLoginId(user);
  const todos = await TodoController.getTodos();
  const sortedTodos = TodoPresenter.presentSortedTodos(todos);

  return (
    <main className="todo-container">
      <h1 className="text-xl font-semibold">
        Welcome back, <span className="text-accent-foreground">{loginId}</span>
      </h1>
      <hr className="border-border my-4" />
      <TodoForm />
      <DraggableTodoList initialTodos={sortedTodos} />
    </main>
  );
}
