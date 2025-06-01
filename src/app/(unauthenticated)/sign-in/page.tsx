"use server";

import { CognitoAuthenticator } from "@/components/auth/cognito-authenticator";

/**
 * Server-rendered Sign-In Page that mounts the Amplify Authenticator.
 */
export default async function SignInPage() {
  return (
    <main className="flex items-center justify-center">
      <CognitoAuthenticator />
    </main>
  );
}
