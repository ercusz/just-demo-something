import { createTRPCRouter, hrProcedure } from "../trpc";

export const departmentRouter = createTRPCRouter({
  all: hrProcedure.query(({ ctx }) => {
    return ctx.prisma.department.findMany({ orderBy: { name: "asc" } });
  }),
});
