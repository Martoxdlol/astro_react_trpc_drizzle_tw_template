import type { inferAsyncReturnType } from '@trpc/server';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { getSession } from '../services/session';
import type { AstroCookies } from 'astro';

export async function createContext({
    req,
    resHeaders,
    cookies,
    clientAddress,
}: FetchCreateContextFnOptions & { cookies: AstroCookies, clientAddress: string }) {
    const session = await getSession(cookies);
    return { req, resHeaders, cookies, clientAddress, session };
}


export type Context = inferAsyncReturnType<typeof createContext>;