import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const protectedPaths = ["/posts"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected =
    protectedPaths.some((p) => pathname.startsWith(p)) ||
    (pathname.startsWith("/api/posts") && request.method !== "OPTIONS");

  if (!isProtected) {
    return NextResponse.next();
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/posts/:path*", "/api/posts/:path*", "/api/ai/:path*"],
};
