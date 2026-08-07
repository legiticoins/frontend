import type { APIRoute, AstroCookies } from "astro";
const { BACKEND_URL, SITE_ROOT } = process.env;
import { randomBytes, createHash } from "crypto";

const { MCAUTH_CLIENT_ID, MCAUTH_CLIENT_SECRET } = process.env;

const REDIRECT_URI = `${SITE_ROOT}/login`;

export async function isLoggedIn(cookies: AstroCookies) {
  return cookies.get("authorization.token") && cookies.get("profile.uuid");
}

export const GET: APIRoute = async ({ url, cookies, redirect, request }) => {
  const loggedIn = await isLoggedIn(cookies);
  if (loggedIn) {
    return redirect(cookies.get("oauth.redirect")?.value ?? "/", 302);
  }

  const RAW_SEARCH_PARAMS = url.href.split("?")[1];
  const SEARCH_PARAMS = new URLSearchParams(RAW_SEARCH_PARAMS);

  // Client hasnt logged in yet
  if (!SEARCH_PARAMS.get("code")) {
    const state = randomBytes(32).toString("hex");

    cookies.set("oauth.state", state, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 600,
    });

    const redirectTo = request.headers.get("referer") ?? "/";
    cookies.set("oauth.redirect", redirectTo, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 600,
    });
    const authUrl = new URL("https://mc-auth.com/oAuth2/authorize");
    authUrl.searchParams.append("client_id", MCAUTH_CLIENT_ID!);
    authUrl.searchParams.append("redirect_uri", REDIRECT_URI);
    authUrl.searchParams.append("scope", "profile");
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("state", state);
    return redirect(authUrl.toString(), 302);
  }

  // Client has redirected. We got the code.
  const mcAuthPostRequestBody = {
    client_id: MCAUTH_CLIENT_ID,
    client_secret: MCAUTH_CLIENT_SECRET,
    code: SEARCH_PARAMS.get("code"),
    redirect_uri: REDIRECT_URI,
    grant_type: "authorization_code",
  };

  const backendResponse = await fetch(`${BACKEND_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mcAuthPostRequestBody),
  });
  const backendResponseBody = await backendResponse.json();

  if (
    backendResponseBody.success == false ||
    backendResponseBody.state != cookies.get("oauth.state")?.value
  ) {
    return redirect(`/login-fail`, 302);
  }

  // don't make the user confused on why they didnt log in cuz why not
  if (!backendResponse.ok) return redirect(`/login-fail`, 302);

  const { token, uuid } = backendResponseBody;

  cookies.set("authorization.token", token, {
    path: "/",
    sameSite: "strict",
    maxAge: 31536000,
  });
  cookies.set("profile.uuid", uuid, {
    path: "/",
    sameSite: "strict",
    maxAge: 31536000,
  });

  const redirectBack = cookies.get("oauth.redirect")?.value ?? "/";
  cookies.delete("oauth.redirect");
  cookies.delete("oauth.state");

  return redirect(redirectBack, 302);
};
