import type { SessionUser } from "@domain/models/Session";

export interface ISessionRepository {
  getCurrentUser(): Promise<SessionUser | undefined>;
  checkAuthentication(): Promise<boolean>;
}
