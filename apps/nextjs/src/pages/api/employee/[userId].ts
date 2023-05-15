import { appRouter } from "@acme/api";
import { prisma } from "@acme/db";
import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const userId = req.query.userId as string;

  if (!userId) {
    res.status(401).json({
      error: { message: "Authentication failed" },
    });
    return;
  }

  try {
    const caller = appRouter.createCaller({
      userId,
      prisma,
    });

    // the server-side call
    const employeeData = await caller.employee.byId({ userId });

    if (!employeeData) {
      res.status(403).json({
        error: { message: "Access denied" },
      });
      return;
    }

    res.status(200).json({ data: employeeData });
  } catch (cause) {
    // If this a tRPC error, we can extract additional information.
    if (cause instanceof TRPCError) {
      // We can get the specific HTTP status code coming from tRPC (e.g. 404 for `NOT_FOUND`).
      const httpStatusCode = getHTTPStatusCodeFromError(cause);

      res.status(httpStatusCode).json({ error: { message: cause.message } });
      return;
    }

    // This is not a tRPC error, so we don't have specific information.
    res.status(500).json({
      error: {
        message: `Error while accessing employee with user_id=${userId}`,
      },
    });
  }
}
