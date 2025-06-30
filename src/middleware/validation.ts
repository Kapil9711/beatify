import { NextFunction, Request, Response } from "express";
import CustomError from "./customerError";
import { z } from "zod";

const validate =
  (schema: z.ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const message = result.error.errors
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join(", ");
      return next(new CustomError(message, 400));
    }

    // Attach validated data to req
    req.body = result.data;
    next();
  };

export default validate;
