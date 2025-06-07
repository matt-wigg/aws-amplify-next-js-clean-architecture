import { cookies } from "next/headers";
import { getCurrentUser, fetchAuthSession } from "aws-amplify/auth/server";
import { runWithAmplifyServerContext } from "@infrastructure/utils/amplify.utils";
import type { ISessionRepository } from "@domain/interfaces/session.interface";
import type { SessionUser } from "@domain/models/Session";

/**
 * Implements session-related operations using AWS Amplify and Next.js server context.
 */
export const sessionRepository: ISessionRepository = {
  /**
   * Retrieves the currently authenticated user, if any.
   *
   * @returns The current session user or undefined if not authenticated.
   */
  async getCurrentUser(): Promise<SessionUser | undefined> {
    try {
      const user = await runWithAmplifyServerContext({
        nextServerContext: { cookies },
        operation: (ctx) => getCurrentUser(ctx),
      });
      return user;
    } catch (err) {
      console.error("SessionRepository.getCurrentUser error:", err);
      return undefined;
    }
  },

  /**
   * Checks if a user is currently authenticated.
   *
   * @returns True if authenticated; otherwise, false.
   */
  async checkAuthentication(): Promise<boolean> {
    try {
      return await runWithAmplifyServerContext({
        nextServerContext: { cookies },
        operation: async (ctx) => {
          const session = await fetchAuthSession(ctx, {});
          return session.tokens !== undefined;
        },
      });
    } catch (err) {
      console.error("SessionRepository.checkAuthentication error:", err);
      return false;
    }
  },
};
