import { NextRequest, NextResponse } from "next/server";
import { fetchAuthSession } from "aws-amplify/auth/server";
import { runWithAmplifyServerContext } from "@/utils/amplify.utils";
import {
  isPublicRoute,
  redirectToSignIn,
  redirectToWelcome,
} from "@/utils/middleware.utils";

// Configuration to match all routes except for static assets and API routes
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

/**
 * Middleware to handle authentication and route access logic.
 *
 * @param request - Incoming Next.js request
 * @returns NextResponse - Either proceeds, or redirects to sign-in or welcome page
 */
export async function middleware(request: NextRequest): Promise<NextResponse> {
  const response = NextResponse.next();
  const { nextUrl } = request;

  try {
    const isRoutePublic = isPublicRoute(nextUrl);

    const isAuthenticated = await runWithAmplifyServerContext({
      nextServerContext: { request, response },
      operation: async (contextSpec) => {
        try {
          const session = await fetchAuthSession(contextSpec, {});
          return session.tokens !== undefined;
        } catch {
          return false;
        }
      },
    });

    // Redirect authenticated users away from public routes (e.g. sign-in page)
    if (isRoutePublic && isAuthenticated) {
      return redirectToWelcome(nextUrl);
    }

    // Redirect unauthenticated users away from protected routes
    if (!isRoutePublic && !isAuthenticated) {
      return redirectToSignIn(nextUrl);
    }

    return response;
  } catch (error) {
    console.error("Middleware auth error:", error);
    return redirectToSignIn(nextUrl);
  }
}
