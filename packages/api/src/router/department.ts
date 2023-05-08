import { createTRPCRouter, publicProcedure } from "../trpc";

export const departmentRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.department.findMany({ orderBy: { name: "asc" } });
  }),
});
