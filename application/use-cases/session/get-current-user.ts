import type { ISessionRepository } from "@domain/interfaces/session.interface";
import type { SessionUser } from "@domain/models/Session";

/**
 * Retrieves the currently authenticated user session.
 *
 * @param repo - The session repository (injected dependency).
 * @returns A Promise that resolves to the session user, or undefined if not authenticated.
 */
export async function getCurrentUser(
  repo: ISessionRepository
): Promise<SessionUser | undefined> {
  return repo.getCurrentUser();
}
