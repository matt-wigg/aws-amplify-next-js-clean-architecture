"use client";

import { useEffect } from "react";
import { Amplify } from "aws-amplify";
import outputs from "@/../amplify_outputs.json";

/**
 * Configures the Amplify client-side runtime.
 * This component should be rendered once at the root level (e.g., layout or provider).
 */
export function ConfigureAmplifyClientSide() {
  useEffect(() => {
    // Configure Amplify only once on the client
    Amplify.configure(outputs, { ssr: true });
  }, []);

  return null;
}
