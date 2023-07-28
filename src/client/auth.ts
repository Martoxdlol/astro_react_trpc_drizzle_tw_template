import type { SessionData } from "../services/session"

export async function fetchSession() {
    const res = await fetch('/api/auth/session')
    const data = await res.json()
    return data as SessionData | null
}

export const signInUrl = '/api/auth/signin'
export const signOutUrl = '/api/auth/signout'
export const defaultRedirectUrl = '/'

export async function signIn(redirectUrl?: string | URL) {
    const url = new URL(signInUrl, window.location.href)
    url.searchParams.set('redirectUrl', (redirectUrl || defaultRedirectUrl).toString())
    window.location.href = url.href
}

export async function signOut() {
    window.location.href = signOutUrl
}

export function getLocalSession() {
    return ((window as any).session || null) as SessionData | null
}