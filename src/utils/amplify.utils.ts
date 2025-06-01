import { cookies } from "next/headers";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { getCurrentUser } from "aws-amplify/auth/server";
import outputs from "@/../amplify_outputs.json";
import type { Schema } from "@/../amplify/data/resource";

/**
 * Provides a way to run operations within the Amplify server context.
 */
export const { runWithAmplifyServerContext } = createServerRunner({
  config: outputs,
});

/**
 * Amplify API client configured to use cookies for authentication context.
 */
export const cookiesClient = generateServerClientUsingCookies<Schema>({
  config: outputs,
  cookies,
});

/**
 * Gets the currently authenticated user from the server context.
 *
 * @returns The authenticated user object or undefined if unauthenticated
 */
export async function getCurrentUserFromServer() {
  try {
    const currentUser = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });

    return currentUser;
  } catch (error) {
    console.error("Failed to get current user from server:", error);
    return undefined;
  }
}
