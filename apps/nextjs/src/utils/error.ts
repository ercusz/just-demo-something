import { TRPCClientErrorLike } from "@trpc/client";

export const getFormattedFieldError = (err: TRPCClientErrorLike<any>) => {
  const fieldErrors = err.data?.zodError?.fieldErrors;
  let errorMsg = "An unexpected error occurred, please try again later.";

  if (fieldErrors) {
    errorMsg = "";
    for (const [k, v] of Object.entries(fieldErrors)) {
      errorMsg += k + ": " + v + "\n";
    }
  }

  return errorMsg;
};
