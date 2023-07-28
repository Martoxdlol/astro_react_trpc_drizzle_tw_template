import type { APIRoute } from 'astro';
import { getAndDeleteAuthIntent, getClient, getRedirectUrl } from '../../../services/auth';
import { insertOrUpdateUser } from '../../../services/user';
import { createSession, getSessionCookieName } from '../../../services/session';
import type { NewUserData } from '../../../services/user';

export const get: APIRoute = async function get({ params, request, redirect, cookies }) {
    const client = await getClient();

    const url = new URL(request.url)
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')

    if (!code) {
        return redirect('/?error=missing_code')
    }

    if (!state) {
        return redirect('/?error=missing_state')
    }

    const [id, verification] = state.split(':')

    if (!id || !verification) {
        return redirect('/?error=invalid_state')
    }

    const intent = await getAndDeleteAuthIntent(id, verification)

    if (!intent) {
        return redirect('/?error=invalid_state')
    }

    try {
        const tokenSet = await client.callback(getRedirectUrl(), { code, code_verifier: intent.codeVerifier, state }, {
            state, code_verifier: intent.codeVerifier,
        })

        const { email, name, picture } = tokenSet.claims()

        if (!email) {
            return redirect('/?error=missing_email')
        }

        const userData: NewUserData = {
            email,
            name: name ?? null,
            picture: picture ?? null,
        }

        const completeUserData = await insertOrUpdateUser(userData)
        const sessionId = await createSession(completeUserData)

        cookies.set(getSessionCookieName(), sessionId, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 10),
            path: '/',
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
        })

        return redirect(intent.redirect)
    } catch (error) {
        console.error(error)
        return redirect('/?error=bad_request')
    }
}