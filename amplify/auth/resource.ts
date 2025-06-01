import { defineAuth } from "@aws-amplify/backend";

/**
 * Defines and configures authentication using Amazon Cognito.
 *
 * Currently enables email-based login with a custom verification message.
 * For OAuth or social provider support, see Amplify docs:
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailSubject: "Welcome! Verify your email!",
    },
    // To support social logins (Google, Facebook, etc.), configure below:
    // externalProviders: {
    //   callbackUrls: [
    //     "http://localhost:3000/login",
    //     "https://yourdomain.com/login"
    //   ],
    //   logoutUrls: [
    //     "http://localhost:3000/logout",
    //     "https://yourdomain.com/logout"
    //   ]
    // }
  },
});
