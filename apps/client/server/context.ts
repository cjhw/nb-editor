import { getSession } from '@/libs/auth';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

export async function createContext(opts: FetchCreateContextFnOptions) {
  const session = await getSession();
  return {
    session
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
