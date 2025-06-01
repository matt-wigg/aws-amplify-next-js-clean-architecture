"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Image from "next/image";
import Logo from "@/../public/logo.webp";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { ROUTES } from "@/constants/routes.constants";

/**
 * Custom UI components for Amplify Authenticator.
 */
const customComponents = {
  Header() {
    const { resolvedTheme } = useTheme();
    console.log("Current theme:", resolvedTheme);
    return (
      <figure className="w-30 h-30 mx-auto border relative overflow-hidden rounded-full mb-8">
        <Image
          src={Logo}
          alt="Logo"
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
 * Handles redirecting the user after successful authentication.
 */
function AuthRedirectHandler() {
  const router = useRouter();
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  useEffect(() => {
    if (authStatus === "authenticated") {
      router.replace(ROUTES.INTERNAL.WELCOME);
    }
  }, [authStatus, router]);

  return null;
}

/**
 * Amplify Cognito Authenticator component.
 * Wraps the sign-in UI with Matt Wigg branding and handles post-login redirection.
 */
export function CognitoAuthenticator() {
  return (
    <Authenticator.Provider>
      <AuthRedirectHandler />
      <Authenticator components={customComponents} initialState="signIn" />
    </Authenticator.Provider>
  );
}
