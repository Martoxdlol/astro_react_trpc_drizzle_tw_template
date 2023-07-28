import type { APIRoute } from "astro";
import { getSession } from "../../../services/session";

export const get: APIRoute = async function get({ params, request, redirect, cookies }) {
    const session = await getSession(cookies);

    if (!session) {
        return {
            status: 200,
            type: "application/json",
            body: JSON.stringify(null)
        }
    }

    return {
        status: 200,
        type: "application/json",
        body: JSON.stringify({
            email: session.email,
            name: session.name,
            picture: session.picture,
        }, null, 4)
    }
}