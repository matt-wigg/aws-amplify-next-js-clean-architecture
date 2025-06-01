"use server";

import { getCurrentUserFromServer } from "@/utils/amplify.utils";
import { SignOutForm } from "@/components/auth/sign-out-form";
import { TodoForm } from "@/components/todo/todo-form";
import { TodoList } from "@/components/todo/todo-list";
import type { CognitoUser } from "@/types/auth.types";

/**
 * Server-rendered welcome/todo page for authenticated users.
 */
export default async function WelcomePage() {
  const user: CognitoUser | undefined = await getCurrentUserFromServer();
  const userName = user?.signInDetails?.loginId || "Unknown User";

  return (
    <main>
      <div className="todo-container">
        <h1 className="text-xl font-semibold">
          Welcome back,{" "}
          <span className="text-accent-foreground">{userName}</span>
        </h1>
        {user && <SignOutForm />}
        <hr className="border-border my-4" />
        <TodoForm />
        <TodoList />
      </div>
    </main>
  );
}
