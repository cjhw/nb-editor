import { initTRPC } from '@trpc/server';
import type { Context } from '../context';

const t = initTRPC.context<Context>().create();
export const publicProcedure = t.procedure;
