import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    console.log("Middleware Pathname:", request.nextUrl.pathname);
    console.log("Middleware Token:", request.nextauth.token);

    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      request.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }

    // // IF USER IS ALREADY SUBSCRIBED THEN DONT SHOW PRICING PAGE
    // if (
    //   request.nextUrl.pathname.startsWith("/subscription") &&
    //   request.nextauth.token?.isActiveSubscription
    // ) {
    //   return NextResponse.rewrite(new URL("/profile", request.url));
    // }

    // // IF USER IS NOT SUBSCRIBED THEN DONT SHOW PROFILE PAGE
    // if (
    //   request.nextUrl.pathname.startsWith("/profile") &&
    //   !request.nextauth.token?.isActiveSubscription
    // ) {
    //   return NextResponse.rewrite(new URL("/subscription", request.url));
    // }

    if (
      request.nextUrl.pathname.startsWith("/moderation") &&
      request.nextauth.token?.role !== "admin" &&
      request.nextauth.token?.role !== "moderator"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin", "/moderation", "/subscription", "/profile"],
};
