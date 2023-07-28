import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import type { APIRoute } from 'astro';
import { createContext } from '../../server/context';
import { appRouter } from '../../server/api';
export const all: APIRoute = ({ request, cookies, clientAddress }) => {
    return fetchRequestHandler({
        endpoint: '/trpc',
        req: request,
        router: appRouter,
        createContext: (opts) => createContext({ ...opts, cookies, clientAddress }),
    });
};