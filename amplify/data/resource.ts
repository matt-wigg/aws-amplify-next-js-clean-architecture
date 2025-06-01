import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/**
 * Defines the data models for the application using Amplify Gen 2 schema syntax.
 */
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(), // Text content of the todo item
      done: a.boolean(), // Completion status
      priority: a.enum(["low", "medium", "high"]), // Importance level
    })
    .authorization((allow) => [allow.owner(), allow.groups(["Admin"])]), // Restrict access to the item owner and Admin group
});

/**
 * Type-safe client schema for accessing generated types across app layers.
 */
export type Schema = ClientSchema<typeof schema>;

/**
 * Exports the data configuration for Amplify, using Amazon Cognito User Pools for auth.
 */
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
