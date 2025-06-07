import type { ISessionRepository } from "@domain/interfaces/session.interface";

/**
 * Checks whether a user is currently authenticated.
 *
 * @param repo - The session repository (injected dependency).
 * @returns A Promise that resolves to true if authenticated, otherwise false.
 */
export async function checkAuthentication(
  repo: ISessionRepository
): Promise<boolean> {
  return repo.checkAuthentication();
}
