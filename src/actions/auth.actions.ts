"use client";

import { signOut } from "aws-amplify/auth";
import type { ActionState } from "@/types/action.types";

/**
 * A client-side action that signs out the current user using Amplify Auth.
 * Callers are responsible for redirecting after a successful sign-out.
 *
 * @returns {Promise<ActionState>} An object indicating success or an error message.
 */
export async function signOutAction(): Promise<ActionState> {
  try {
    await signOut();
    return { success: true };
  } catch (err) {
    console.error("signOutAction error:", err);
    return { error: "Failed to sign out. Please try again." };
  }
}
