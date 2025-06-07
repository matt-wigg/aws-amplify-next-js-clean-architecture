import { getCurrentUser } from "@application/use-cases/session/get-current-user";
import { checkAuthentication } from "@application/use-cases/session/check-authentication";
import { sessionRepository } from "@infrastructure/repositories/session.repository";
import type { SessionUser } from "@domain/models/Session";

/**
 * Controller responsible for managing session-related actions.
 */
export const SessionController = {
  /**
   * Retrieves the currently authenticated session user.
   *
   * @returns A Promise that resolves to the current user or undefined if not authenticated.
   */
  async getCurrentUser(): Promise<SessionUser | undefined> {
    return getCurrentUser(sessionRepository);
  },

  /**
   * Checks whether a user is currently authenticated.
   *
   * @returns A Promise that resolves to true if authenticated, otherwise false.
   */
  async isAuthenticated(): Promise<boolean> {
    return checkAuthentication(sessionRepository);
  },
};
