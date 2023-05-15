import { appRouter } from "@acme/api";
import { createInnerTRPCContext } from "@acme/api/src/trpc";
import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";

export const generateServerSideHelper = (userId: string) =>
  createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext(userId),
    transformer: superjson, // optional - adds superjson serialization
  });
