import { fetchEmployeeData } from "./utils/employee";
import { authMiddleware } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const positionEnum = z.enum(["HR", "Manager", "Employee"]);
const hrPath = z.enum(["/add-employee", "add-department"]);
const managerPath = z.enum(["/department"]);

type pathTypes = typeof hrPath | typeof managerPath;
interface IAllowProtectedRoute {
  userId: string | null;
  path: pathTypes;
  expectedPosition: z.infer<typeof positionEnum>;
  req: NextRequest;
}

const isAllowProtectedRoute = async ({
  userId,
  path,
  expectedPosition,
  req,
}: IAllowProtectedRoute) => {
  // check if the current route is a protected route
  if (path.safeParse(req.nextUrl.pathname).success) {
    if (!userId) {
      return false;
    }

    // fetch employee data
    const employeeData = await fetchEmployeeData(userId);
    if (!employeeData) {
      return false;
    }

    // check if the employee position
    // is the same as the expected position
    if (employeeData.position.name !== expectedPosition) {
      return false;
    }
  }

  return true;
};

export default authMiddleware({
  ignoredRoutes: [],
  publicRoutes: ["/", "/sign-in"],
  async afterAuth(auth, req, evt) {
    // get user id from clerk
    const { userId } = auth;
    const accessDeniedURL = new URL("/access-denied", req.url);

    // check if user is allowed to access the HR routes
    const allowHrRoutes = await isAllowProtectedRoute({
      userId: userId ?? null,
      path: hrPath,
      expectedPosition: "HR",
      req,
    });
    // if not allowed, redirect to access denied page
    if (!allowHrRoutes) {
      return NextResponse.redirect(accessDeniedURL);
    }

    // check if user is allowed to access the Manager routes
    const allowManagerRoutes = await isAllowProtectedRoute({
      userId: userId ?? null,
      path: managerPath,
      expectedPosition: "Manager",
      req,
    });
    // if not allowed, redirect to access denied page
    if (!allowManagerRoutes) {
      return NextResponse.redirect(accessDeniedURL);
    }
  },
});

// Stop Middleware running on static files
export const config = {
  matcher: ["/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)", "/"],
};
