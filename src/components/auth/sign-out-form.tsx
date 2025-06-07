"use client";

import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { signOutAction } from "@nextjs/actions/auth.actions";
import { ROUTES } from "@nextjs/constants/routes.constants";
import { LoadingSpinner } from "@nextjs/components/layout/loading-spinner";

/**
 * A client-only form that signs the user out and redirects to the sign-in page.
 *
 * Handles loading and error state with visual feedback.
 */
export function SignOutForm() {
  const router = useRouter();

  const [result, signOut, isPending] = useActionState(async () => {
    const response = await signOutAction();

    if (response.success) {
      router.replace(ROUTES.INTERNAL.SIGN_IN);
    }

    return response;
  }, undefined);

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

      {result?.error && (
        <p id="signout-error" className="mt-2 text-sm text-destructive">
          {result.error}
        </p>
      )}
    </form>
  );
}
