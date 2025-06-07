import { defineBackend } from "@aws-amplify/backend";
import { auth } from "@auth/resource";
import { data } from "@data/resource";

/**
 * Defines the backend resources for this Amplify project.
 *
 * Included resources:
 * - `auth`: Cognito-based authentication
 * - `data`: Domain data models and authorization rules
 *
 * For adding more services (e.g., storage, functions, AI):
 * @see https://docs.amplify.aws/react/build-a-backend/
 */
export const backend = defineBackend({
  auth,
  data,
});
