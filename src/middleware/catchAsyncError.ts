import { Request, Response, NextFunction } from "express";

const catchAsyncError =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };

export default catchAsyncError;
