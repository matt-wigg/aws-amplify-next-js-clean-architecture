"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import Logo from "@public/logo.webp";
import { ROUTES } from "@nextjs/constants/routes.constants";

/**
 * Custom UI components for the Amplify Authenticator.
 * Includes Matt Wigg-branded header and a global footer.
 */
const customComponents = {
  Header() {
    return (
      <figure className="w-30 h-30 mx-auto border border-border relative overflow-hidden rounded-full mb-8">
        <Image
          src={Logo}
          alt="Matt Wigg Logo"
          fill
          sizes="96px"
          style={{
            objectFit: "cover",
          }}
          priority
          quality={85}
        />
      </figure>
    );
  },

  Footer() {
    return (
      <p className="text-sm text-center text-muted-foreground mt-4">
        &copy; {new Date().getFullYear()} Matt Wigg. All Rights Reserved.
      </p>
    );
  },
};

/**
 * Handles redirecting the user to the app after successful authentication.
 */
function AuthRedirectHandler() {
  const router = useRouter();
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  useEffect(() => {
    if (authStatus === "authenticated") {
      router.replace(ROUTES.INTERNAL.HOME);
    }
  }, [authStatus, router]);

  return null;
}

/**
 * CognitoAuthenticator component.
 * Renders the Amplify Authenticator with Matt Wigg branding and handles routing after login.
 */
export function CognitoAuthenticator() {
  return (
    <Authenticator.Provider>
      <AuthRedirectHandler />
      <Authenticator components={customComponents} initialState="signIn" />
    </Authenticator.Provider>
  );
}
