import { type NextFetchEvent, type NextRequest, NextResponse } from "next/server";

import { CustomMiddleware } from "./chain";

const withoutAuth = ["/sign-in", "/reset-password", "/forgot-password"];
const protectedRoutes = ["/projects"];

export function middlewareValidToken(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    const { pathname } = request.nextUrl;
    const isWithoutAuth = withoutAuth.includes(pathname);
    const isProtected = protectedRoutes.includes(pathname);
    const isAuthValid = request.cookies.get("isAuthenticated")?.value;

    if (isAuthValid && isWithoutAuth) {
      // TODO: change url to home
      const res = NextResponse.redirect(new URL("/", request.url));
      return middleware(request, event, res);
    }

    if (!isAuthValid && isProtected) {
      const signInUrl = new URL(`/sign-in`, request.url);
      const res = NextResponse.redirect(signInUrl);
      return middleware(request, event, res);
    }

    return middleware(request, event, response);
  };
}
