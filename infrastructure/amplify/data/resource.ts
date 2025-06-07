import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/**
 * Defines the domain models and authorization rules using Amplify Gen 2 schema.
 */
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
      done: a.boolean(),
      priority: a.enum(["low", "medium", "high"]),
      order: a.float(),
    })
    .authorization((allow) => [allow.owner(), allow.groups(["Admin"])]),
});

/**
 * Type-safe client schema for referencing generated types throughout the app.
 */
export type Schema = ClientSchema<typeof schema>;

/**
 * Amplify data configuration using Cognito User Pools for authentication.
 */
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
