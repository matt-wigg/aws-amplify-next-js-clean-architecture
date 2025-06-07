"use client";

import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import outputs from "@infrastructure/amplify_outputs.json";
import type { PropsWithChildren } from "react";

/**
 * Configures the Amplify client runtime and wraps app in Authenticator context.
 */
Amplify.configure(outputs, { ssr: true });

export function ConfigureAmplifyClientSide({ children }: PropsWithChildren) {
  return <Authenticator.Provider>{children}</Authenticator.Provider>;
}
