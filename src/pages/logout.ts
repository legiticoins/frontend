import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies, redirect }) => {
     cookies.delete('profile.uuid', { path: '/' })
     cookies.delete('authorization.token', { path: '/' })
     return redirect('/');
}