import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET!;
const encoder = new TextEncoder();

const publicRoutes = [
  "/login",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (publicRoutes.includes(pathname) && pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const secret = encoder.encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    return NextResponse.next();
  } catch (err) {
    console.error("JWT error:", err);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api).*)"],
};
