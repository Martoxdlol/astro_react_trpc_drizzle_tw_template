import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { appRouter } from '../server/api';
import { createTRPCReact } from '@trpc/react-query';

const opts = {
    links: [
        httpBatchLink({
            url: '/trpc',
        }),
    ],
}

export const client = createTRPCProxyClient<typeof appRouter>(opts);
export const trpc = createTRPCReact<typeof appRouter>();
export const clientForReactQuery = trpc.createClient(opts)
