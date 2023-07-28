import type { APIRoute } from 'astro';
import { createAuthIntent, getClient } from '../../../services/auth';
import { defaultRedirectUrl } from '../../../client/auth';

export const get: APIRoute = async function get({ params, request, redirect }) {
    const client = await getClient();

    const redirectUrl = new URL(request.url).searchParams.get('redirect') || defaultRedirectUrl

    const { codeChallenge, id, verification } = await createAuthIntent(redirectUrl)

    const authorizationUrl = client.authorizationUrl({
        scope: 'openid email profile',
        code_challenge: codeChallenge,
        code_challenge_method: 'S256',
        state: `${id}:${verification}`
    });

    return redirect(authorizationUrl)
}