import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.auth.session;
  }),
  getSecretMessage: protectedProcedure.query(({ ctx }) => {
    return `สวัสดี ตำแหน่งของคุณ คือ ${ctx.auth.employeeData?.position.name}`;
  }),
});
