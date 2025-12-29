import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { decrypt } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // 1. Define protected routes
  const isProtectedRoute = path.startsWith("/admin");
  const isPublicRoute = path === "/admin/login";

  // 2. Check for session
  const cookie = request.cookies.get("session")?.value;
  
  // 3. Decrypt session (if exists)
  let session = null;
  if (cookie) {
      try {
        session = await decrypt(cookie);
      } catch (e) {
        // invalid session
      }
  }

  // 4. Redirect Logic
  // If trying to access admin dashboard without session -> Redirect to Login
  if (isProtectedRoute && !isPublicRoute && !session) {
    return NextResponse.redirect(new URL("/admin/login", request.nextUrl));
  }

  // If trying to access Login page WITH session -> Redirect to Dashboard
  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL("/admin", request.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
