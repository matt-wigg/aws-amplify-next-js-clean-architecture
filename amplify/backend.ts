import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";

/**
 * Defines the Amplify backend resources for this project.
 *
 * Includes:
 * - `auth`: Cognito-based authentication configuration
 * - `data`: Data modeling and access layer via Amplify Data (e.g., DataStore or GraphQL API)
 *
 * To extend this backend (e.g., add storage, functions, or AI):
 * @see https://docs.amplify.aws/react/build-a-backend/
 */
export const backend = defineBackend({
  auth,
  data,
});
