import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../types/express/request";
import catchAsyncError from "./catchAsyncError";
import UserModel from "../model/user";

const apiDocsHandler = catchAsyncError(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const token = req?.cookies?.token;

    if (token) {
      req.headers.authorization = `Bearer ${token}`;
    }
    next();
  }
);

export default apiDocsHandler;
