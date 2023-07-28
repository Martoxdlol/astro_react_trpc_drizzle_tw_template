import type { AstroCookies } from "astro";
import { generateId, database, generateSecureString, schema } from "../database";
import type { UserData } from "./user";
import { InferModel, eq } from "drizzle-orm";

export function getSessionCookieName() {
    return import.meta.env.SESSION_COOKIE_NAME || 'session'
}

export function getSessionId(cookies: AstroCookies) {
    return cookies.get(getSessionCookieName()).value
}

export type SessionData = Omit<InferModel<typeof schema.sessions>, 'createdAt' | 'updatedAt' | 'id'>;

export async function createSession(user: UserData) {
    const sessionId = `${generateId()}:${generateSecureString()}`

    await database.insert(schema.sessions).values({
        id: sessionId,
        email: user.email,
        name: user.name,
        picture: user.picture,
        updatedAt: new Date(),
        createdAt: new Date(),
    })

    return sessionId
}

export async function getSession(cookiesOrSessionId: AstroCookies | string | undefined | null) {
    if (!cookiesOrSessionId) {
        return null
    }

    const sessionId = typeof cookiesOrSessionId === 'string' ? cookiesOrSessionId : getSessionId(cookiesOrSessionId)

    if (!sessionId) {
        return Promise.resolve(null)
    }

    const session = (await database.select().from(schema.sessions).where(eq(schema.sessions.id, sessionId)).limit(1))[0]

    return session
}

export async function deleteSession(cookiesOrSessionId: AstroCookies | string | undefined | null) {
    if (!cookiesOrSessionId) {
        return
    }

    const sessionId = typeof cookiesOrSessionId === 'string' ? cookiesOrSessionId : getSessionId(cookiesOrSessionId)

    if (!sessionId) {
        return
    }

    await database.delete(schema.sessions).where(eq(schema.sessions.id, sessionId))

}