import { signOut } from "aws-amplify/auth";

/**
 * Handles client-side session operations (used directly in UI).
 */
export const ClientSessionController = {
  /**
   * Signs the user out on the client.
   *
   * @param global - Whether to perform a global sign-out across all devices.
   */
  async signOut(global: boolean = false): Promise<void> {
    await signOut({ global });
  },
};
