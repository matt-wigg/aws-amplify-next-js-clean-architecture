"use server";

import { CognitoAuthenticator } from "@nextjs/components/auth/cognito-authenticator";

/**
 * Server-rendered Sign-In Page that mounts the Amplify Authenticator.
 */
export default async function SignInPage() {
  return (
    <main className="flex h-[100dvh] flex-col items-center justify-center overflow-auto">
      <CognitoAuthenticator />
    </main>
  );
}
