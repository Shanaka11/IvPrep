import { ZodError } from "zod";

export const parseZodErrors = (zodError: ZodError) => {
  const errors = zodError.issues.map((issue) => {
    return {
      path: issue.path.join("."),
      message: issue.message,
    };
  });

  return errors;
};
