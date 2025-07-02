import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "../model/user";
import catchAsyncError from "./catchAsyncError";

import { NextFunction, Request, Response } from "express";
import CustomError from "./customError";
import pathVariable from "../config/pathVariables";
import { ExtendedRequest } from "../types/express/request";

// Check if the user is authenticated or not
export const isAuthenticatedUser = catchAsyncError(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    let token;
    let path = req.originalUrl;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (
      (req.originalUrl == "/api-docs" || req.originalUrl == "/api-docs/") &&
      !token
    ) {
      return res.redirect(302, "/api-docs/login");
    }

    if (!token) {
      return next(new CustomError("Login first to access this resource.", 401));
    }

    const decoded = jwt.verify(token, pathVariable.JWT_SECRET);
    if (typeof decoded === "object" && decoded !== null) {
      var payload = decoded as JwtPayload;
    } else {
      if (req.originalUrl == "/api-docs" || req.originalUrl == "/api-docs/") {
        return res.redirect(302, "/api-docs/login");
      }
      throw new CustomError("Invalid jwt token", 401);
    }

    const user = await UserModel.findById(payload.id).select(
      "isAdmin userName email profileImage"
    );
    if (!user) {
      if (req.originalUrl == "/api-docs" || req.originalUrl == "/api-docs/") {
        return res.redirect(302, "/api-docs/login");
      }
      throw new CustomError("User Not Found", 404);
    }
    req.user = user;
    next();
  }
);

// handling users roles
export const authorize = catchAsyncError(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    if (req.user?.isAdmin) return next();
    if (req.originalUrl == "/api-docs" || req.originalUrl == "/api-docs/") {
      return res.redirect(302, "/api-docs/login");
    }
    throw new CustomError("Not Authorize To Access The Information", 401);
  }
);
