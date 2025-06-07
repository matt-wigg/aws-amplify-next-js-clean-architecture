"use server";

import { SessionController } from "@interface-adapters/controllers/session/session.controller";
import { SessionPresenter } from "@interface-adapters/presenters/session/session.presenter";
import { TodoForm } from "@nextjs/components/todo/todo-form";
import { TodoList } from "@nextjs/components/todo/todo-list";

/**
 * Server-rendered welcome/todo page for authenticated users.
 */
export default async function WelcomePage() {
  const user = await SessionController.getCurrentUser();
  const userName = SessionPresenter.presentUserLoginId(user);

  return (
    <main className="todo-container">
      <h1 className="text-xl font-semibold">
        Welcome back, <span className="text-accent-foreground">{userName}</span>
      </h1>
      <hr className="border-border my-4" />
      <TodoForm />
      <TodoList />
    </main>
  );
}
