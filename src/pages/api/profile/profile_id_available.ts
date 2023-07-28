import type { APIRoute } from 'astro';
import { getSession } from '../../../services/session';

export const get: APIRoute = async function get({ params, request, redirect, cookies }) {
    const session = getSession(cookies)

    const searchParams = new URL(request.url).searchParams
    const id = searchParams.get('id')

    if (!session) {
        return {
            status: 401,
            body: {
                error: 'unauthorized'
            }
        }
    }

    return new Response(JSON.stringify(true), {
        status: 200,
        headers: {
            'content-type': 'application/json'
        }
    })
}