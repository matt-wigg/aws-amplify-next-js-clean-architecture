import { defineAuth } from "@aws-amplify/backend";

/**
 * Configures authentication using Amazon Cognito with email-based login.
 *
 * To enable social providers (e.g., Google, Facebook), uncomment and configure
 * the `externalProviders` section.
 *
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailSubject: "Welcome! Verify your email!",
    },
    // externalProviders: {
    //   callbackUrls: [
    //     "http://localhost:3000/sign-in",
    //     "https://yourdomain.com/sign-in"
    //   ],
    //   logoutUrls: [
    //     "http://localhost:3000/sign-out",
    //     "https://yourdomain.com/sign-out"
    //   ]
    // }
  },
});
