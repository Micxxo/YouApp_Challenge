import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";

const protectedPaths = ["/", "/interest", "api/auth/error"];

const handleProtectedPaths = async (
  pathname: string,
  session: any,
  originalUrl: string
) => {
  const urlWithQuery = new URL("/login", originalUrl);

  if (pathname === "/" && !session) return NextResponse.redirect(urlWithQuery);

  if (
    protectedPaths.slice(1).some((path) => pathname.startsWith(path)) &&
    !session
  ) {
    return NextResponse.redirect(urlWithQuery);
  }
  return null;
};

export default withAuth({
  secret: process.env.NEXTAUTH_SECRET,
});

export const middleware = async (req: NextRequest) => {
  const token = await getToken({ req, secret: process.env.NEXT_PUBLIC_SECRET });
  const { pathname } = req.nextUrl;
  const originalUrl = `${req.nextUrl.protocol}//${req.headers.get("host")}${
    req.nextUrl.pathname
  }`;

  let response;

  response = await handleProtectedPaths(pathname, token, originalUrl);
  if (response) return response;

  return NextResponse.next();
};
