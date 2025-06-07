import { NextRequest, NextResponse } from "next/server";
import {
  isPublicRoute,
  redirectToSignIn,
  redirectToHome,
} from "@nextjs/utils/middleware.utils";
import { SessionController } from "@interface-adapters/controllers/session/session.controller";

/**
 * Middleware route matcher configuration.
 * Applies middleware to all routes except API, static, image, and favicon paths.
 */
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

/**
 * Handles session-based access control for Next.js routing.
 *
 * Redirects:
 * - Authenticated users away from public routes to home page
 * - Unauthenticated users away from protected routes to sign-in page
 *
 * @param request - The incoming Next.js request.
 * @returns A response or redirect based on session state and route access.
 */
export async function middleware(request: NextRequest): Promise<NextResponse> {
  const response = NextResponse.next();
  const { nextUrl } = request;

  try {
    const isRoutePublic = isPublicRoute(nextUrl);
    const isUserAuthenticated = await SessionController.isAuthenticated();

    if (isRoutePublic && isUserAuthenticated) {
      return redirectToHome(nextUrl);
    }

    if (!isRoutePublic && !isUserAuthenticated) {
      return redirectToSignIn(nextUrl);
    }

    return response;
  } catch (error) {
    console.error("Middleware auth error:", error);
    return redirectToSignIn(nextUrl);
  }
}
