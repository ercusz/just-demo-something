import { createTRPCRouter, hrProcedure, protectedProcedure } from "../trpc";
import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const employeeRouter = createTRPCRouter({
  create: hrProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        phone: z.string().min(9).max(10),
        departmentId: z.string().cuid(),
        isManager: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { isManager } = input;
      const positionName = isManager ? "Manager" : "Employee";

      // find positionId of Manager & Employee
      const position = await ctx.prisma.position.findUnique({
        where: {
          name: positionName,
        },
      });

      if (!position) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Position name=${positionName} not found`,
        });
      }

      const createdUser = await clerkClient.users.createUser({
        emailAddress: [input.email],
        password: input.password,
        firstName: input.firstName,
        lastName: input.lastName,
      });

      const employee = {
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        phone: input.phone,
        departmentId: input.departmentId,
        positionId: position.id,
        userId: createdUser.id,
      };

      return ctx.prisma.employee.create({ data: employee });
    }),
  byId: protectedProcedure.query(({ ctx }) => {
    return ctx.auth.employeeData;
  }),
});
