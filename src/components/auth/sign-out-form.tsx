"use client";

import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { signOutAction } from "@/actions/auth.actions";
import { ROUTES } from "@/constants/routes.constants";
import { LoadingSpinner } from "@/components/loading-spinner";

export function SignOutForm() {
  const router = useRouter();

  const [message, signOut, isPending] = useActionState(
    async () => {
      const result = await signOutAction();
      if (result.success) {
        router.replace(ROUTES.INTERNAL.SIGN_IN);
      }
      return result;
    },
    { error: "" }
  );

  return (
    <form action={signOut}>
      <button
        type="submit"
        className="destructive-button"
        disabled={isPending}
        aria-disabled={isPending}
        aria-label="Sign out"
      >
        {isPending ? (
          <>
            <LoadingSpinner />
            Signing out...
          </>
        ) : (
          "Sign out"
        )}
      </button>
      {message?.error && (
        <p id="signout-error" className="mt-2 text-sm text-destructive">
          {message.error}
        </p>
      )}
    </form>
  );
}
