import type { APIRoute } from "astro";
import { deleteSession, getSessionCookieName } from "../../../services/session";

export const get: APIRoute = async function get({ params, request, redirect, cookies }) {
    await deleteSession(cookies)

    cookies.delete(getSessionCookieName())

    return redirect('/')
}