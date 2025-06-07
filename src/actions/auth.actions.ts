"use client";

import { ClientSessionController } from "@interface-adapters/controllers/session/client.session.controller";

interface ActionResponse {
  success: boolean;
  error?: string;
}

/**
 * Client action: Sign the user out.
 *
 * @returns Result object indicating success or failure.
 */
export async function signOutAction(): Promise<ActionResponse> {
  try {
    await ClientSessionController.signOut();
    return { success: true };
  } catch (err) {
    console.error("signOutAction error:", err);
    return { success: false, error: "Failed to sign out." };
  }
}
