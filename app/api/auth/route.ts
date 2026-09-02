import { NextResponse } from "next/server";

/**
 * Step 1 of GitHub sign-in for the admin.
 *
 * Decap talks to GitHub directly for everything except this: swapping the login code for a token
 * needs the client SECRET, which cannot live in a browser. These two routes are that swap and
 * nothing else. No session is created and no token is stored server side.
 */
export const runtime = "edge";

export function GET(req: Request) {
  const id = process.env.GITHUB_CLIENT_ID;
  if (!id) {
    return new NextResponse("GITHUB_CLIENT_ID is not set on this deployment.", { status: 500 });
  }
  const origin = new URL(req.url).origin;
  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.set("client_id", id);
  url.searchParams.set("redirect_uri", `${origin}/api/callback`);
  // `repo` because saving a post is a commit. Narrower scopes cannot write to a repository.
  url.searchParams.set("scope", "repo,user");
  return NextResponse.redirect(url.toString());
}
