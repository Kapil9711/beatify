import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../types/express/request";
import catchAsyncError from "./catchAsyncError";
import UserModel from "../model/user";

const apiDocsHandler = catchAsyncError(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const admin = await UserModel.findOne({ isAdmin: true }).select("token");
    if (admin) {
      req.headers.authorization = `Bearer ${admin.token}`;
    }
    next();
  }
);

export default apiDocsHandler;
