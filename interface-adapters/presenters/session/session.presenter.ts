import type { SessionUser } from "@domain/models/Session";

/**
 * Presenter responsible for formatting session-related data for display.
 */
export const SessionPresenter = {
  /**
   * Extracts and returns a displayable login ID from a session user.
   *
   * @param user - The session user object or undefined.
   * @returns The user's login ID, or "Unknown Login ID" if not available.
   */
  presentUserLoginId(user: SessionUser | undefined): string {
    return user?.signInDetails?.loginId || "Unknown Login ID";
  },

  /**
   * Extracts and returns a displayable user name from a session user.
   *
   * @param user - The session user object or undefined.
   * @returns The user's name, or "Unknown User" if not available.
   */
  presentUserName(user: SessionUser | undefined): string {
    return user?.username || "Unknown User";
  },
};
