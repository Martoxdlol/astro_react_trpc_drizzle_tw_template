import { TRPCError, initTRPC } from '@trpc/server';
import { z } from 'zod';
import type { Context } from './context';
import { database, schema } from '../database';
import { eq } from 'drizzle-orm';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import type { inferReactQueryProcedureOptions } from '@trpc/react-query';

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
  // Queries are the best place to fetch data
  getPostsOfCurrentUser: publicProcedure.query(({ ctx }) => {
    if(!ctx.session) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You must be logged in to do that',
      })
    }

    const posts = database.query.posts.findMany({
      where: eq(schema.posts.userId, ctx.session.id),
      with: {
        user: true,
      }
    })

    return posts
  }),

  address: publicProcedure.query(({ ctx }) => {
    return ctx.clientAddress
  }),

  // Mutations are the best place to do things like updating a database
  goodbye: publicProcedure.mutation(async (opts) => {

    return {
      message: 'goodbye!',
    };
  }),


});

export type AppRouter = typeof appRouter;
export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;