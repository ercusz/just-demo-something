import { authRouter } from "./router/auth";
import { departmentRouter } from "./router/department";
import { employeeRouter } from "./router/employee";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  auth: authRouter,
  employee: employeeRouter,
  department: departmentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
