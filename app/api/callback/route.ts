import { NextResponse } from "next/server";

/**
 * Step 2. GitHub sends the user back here with a code; we trade it for a token and hand that to
 * the admin window, which is waiting for a postMessage.
 *
 * The token goes to the opener and is never persisted here. targetOrigin is pinned to this site's
 * own origin so the token cannot be read by another page.
 */
export const runtime = "edge";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const id = process.env.GITHUB_CLIENT_ID;
  const secret = process.env.GITHUB_CLIENT_SECRET;

  if (!code) return new NextResponse("Missing code.", { status: 400 });
  if (!id || !secret) {
    return new NextResponse("GitHub OAuth is not configured on this deployment.", { status: 500 });
  }

  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ client_id: id, client_secret: secret, code }),
  });
  const data = (await res.json()) as { access_token?: string; error?: string };

  const payload = data.access_token
    ? { token: data.access_token, provider: "github" }
    : { error: data.error ?? "No token returned by GitHub." };
  const state = data.access_token ? "success" : "error";

  // Decap listens for a message shaped exactly like this. The handshake is deliberate: the admin
  // window announces itself first, so we only send the token to a window that asked for it.
  const html = `<!doctype html><html><body><script>
    (function () {
      function send(e) {
        if (e.data !== "authorizing:github") return;
        window.removeEventListener("message", send, false);
        window.opener.postMessage(
          'authorization:github:${state}:${JSON.stringify(payload)}',
          window.location.origin
        );
      }
      window.addEventListener("message", send, false);
      window.opener.postMessage("authorizing:github", "*");
    })();
  </script><p>Signing you in...</p></body></html>`;

  return new NextResponse(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
