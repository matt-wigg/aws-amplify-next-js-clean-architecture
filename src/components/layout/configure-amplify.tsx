"use client";

import { useEffect } from "react";
import { Amplify } from "aws-amplify";
import outputs from "@infrastructure/amplify_outputs.json";

/**
 * Configures the Amplify client runtime.
 *
 * Should be rendered once at the root (e.g., in layout or root provider).
 * Ensures Amplify is initialized with generated outputs on the client.
 */
export function ConfigureAmplifyClientSide() {
  useEffect(() => {
    Amplify.configure(outputs, { ssr: true });
  }, []);

  return null;
}
