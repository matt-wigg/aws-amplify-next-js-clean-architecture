import type { SessionUser } from "@domain/models/Session";

/**
 * Presenter responsible for formatting session-related data for display.
 */
export const SessionPresenter = {
  /**
   * Extracts and returns a displayable login ID from a session user.
   *
   * @param user - The session user object or undefined.
   * @returns The user's login ID, or "Unknown User" if not available.
   */
  presentUserLoginId(user: SessionUser | undefined): string {
    return user?.signInDetails?.loginId || "Unknown User";
  },
};
