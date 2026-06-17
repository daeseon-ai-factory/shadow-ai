import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Branded TestFlight invite: mimi.daeseon.ai/beta → the public TestFlight join link, so we share our
// own domain instead of a raw apple.com URL. Handled before next-intl so it isn't localized to /en/beta.
const BETA_LINK = "https://testflight.apple.com/join/3YJtQwnP";

export default function middleware(req: NextRequest) {
  const stripped = req.nextUrl.pathname.replace(/^\/(en|ko|ja|zh|es)(?=\/|$)/, "");
  if (stripped === "/beta") {
    return NextResponse.redirect(BETA_LINK, 307);
  }
  return intlMiddleware(req);
}

export const config = {
  // Match all paths except API routes, Next internals, and static assets.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
