import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export function middleware(req) {
  const path = req.nextUrl.pathname;
  const isPublicPath = path === "/login";
  const token = req.cookies.get("token")?.value || "";
  const decodedToken = jwt.decode(token);
  const currentTime = new Date().getTime();

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  if (decodedToken?.exp < currentTime && path != "/login") {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
}

export const config = {
  // matcher: ["/", "/login"],
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
