import { Issuer, generators } from "openid-client";
import { generateId, database, generateSecureString, schema } from "../database";
import { eq, lt, gte, ne } from "drizzle-orm";
import type { AstroCookies } from "astro";

export async function getClient() {
    const issuer = await Issuer.discover('https://accounts.google.com');

    const client = new issuer.Client({
        client_id: import.meta.env.OPENID_CLIENT_ID,
        client_secret: import.meta.env.OPENID_CLIENT_SECRET,
        redirect_uris: [getRedirectUrl()],
        response_types: ['code'],
        // id_token_signed_response_alg (default "RS256")
        // token_endpoint_auth_method (default "client_secret_basic")
    });

    return client
}

export function getRedirectUrl() {
    return `${import.meta.env.APP_URL || 'http://localhost:3000'}/api/auth/callback`
}

export async function createAuthIntent(redirectUrl?: string) {
    const codeVerifier = generators.codeVerifier();
    const codeChallenge = generators.codeChallenge(codeVerifier);

    const verification = generateSecureString();

    const id = generateId()

    await database.insert(schema.authIntents).values({
        id: id,
        codeVerifier: codeVerifier,
        redirect: '/',
        verification,
        createdAt: new Date(),
    })

    return {
        codeChallenge,
        verification,
        id,
    }
}

export async function getAndDeleteAuthIntent(id: string, verification: string) {
    const [intent] = await database.select().from(schema.authIntents).where(eq(schema.authIntents.id, id)).limit(1)

    if (!intent || intent.verification !== verification) {
        return null
    }

    await database.delete(schema.authIntents).where(eq(schema.authIntents.id, id))

    return intent
}