import { cookies } from "next/headers";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import outputs from "@infrastructure/amplify_outputs.json";
import type { Schema } from "@infrastructure/amplify/data/resource";

/**
 * Provides an Amplify server-side context runner for executing operations
 * within the authenticated server environment.
 */
export const { runWithAmplifyServerContext } = createServerRunner({
  config: outputs,
});

/**
 * Generates a server-side Amplify client that uses Next.js cookies for session handling.
 */
export const cookiesClient = generateServerClientUsingCookies<Schema>({
  config: outputs,
  cookies,
});
