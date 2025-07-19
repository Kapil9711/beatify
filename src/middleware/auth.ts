import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "../model/user";
import catchAsyncError from "./catchAsyncError";

import { NextFunction, Request, Response } from "express";
import CustomError from "./customError";
import pathVariable from "../config/pathVariables";
import { ExtendedRequest } from "../types/express/request";
import { IUser } from "../types/schemaTypes";

// Check if the user is authenticated
export const isAuthenticatedUser = catchAsyncError(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    // 1. Extract token from Authorization header
    let token;
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2. Handle API docs login page (allow unauthenticated access)
    if (isLoginPage(req.originalUrl) && !token) {
      return next();
    }

    // 3. Redirect to login if accessing docs without token
    if (isApiDocsPage(req.originalUrl) && !token) {
      return redirectToLogin(res);
    }

    // 4. Reject if no token found (except login page)
    if (!token) {
      throw new CustomError("Login first to access this resource.", 401);
    }

    // 5. Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, pathVariable.JWT_SECRET);
    } catch (error) {
      if (isLoginPage(req.originalUrl)) return next();
      if (isApiDocsPage(req.originalUrl)) return redirectToLogin(res);
      throw new CustomError("Invalid JWT token", 401);
    }

    // 6. Validate token payload
    if (!isValidJwtPayload(decoded)) {
      if (isLoginPage(req.originalUrl)) return next();
      if (isApiDocsPage(req.originalUrl)) return redirectToLogin(res);
      throw new CustomError("Invalid JWT token", 401);
    }

    const payload = decoded as JwtPayload;
    // 7. Find user in database
    const user: IUser = await UserModel.findById(payload.id).select(
      "isAdmin userName email profileImage"
    );

    if (!user) {
      if (isLoginPage(req.originalUrl)) return next();
      if (isApiDocsPage(req.originalUrl)) return redirectToLogin(res);
      throw new CustomError("User not found", 404);
    }

    // 8. Redirect if already logged in and accessing login page
    if (isLoginPage(req.originalUrl)) {
      return res.redirect("/api-docs");
    }

    // 9. Attach user to request and proceed
    req.user = user;
    next();
  }
);

// Handle user authorization based on roles
export const authorize = catchAsyncError(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    // 1. Allow access to login page without token
    if (isLoginPage(req.originalUrl)) {
      return next();
    }

    // 2. Allow admin access
    if (req.user?.isAdmin) {
      return next();
    }

    // 3. Redirect to login if trying to access docs
    if (isApiDocsPage(req.originalUrl)) {
      return redirectToLogin(res);
    }

    // 4. Reject unauthorized access
    throw new CustomError("Not authorized to access this resource", 403);
  }
);

// Helper functions
const isLoginPage = (path: string) =>
  path === "/api-docs/login" || path === "/api-docs/login/";

const isApiDocsPage = (path: string) =>
  path === "/api-docs" || path === "/api-docs/";

const redirectToLogin = (res: Response) => res.redirect(302, "/api-docs/login");

const isValidJwtPayload = (decoded: any): decoded is JwtPayload =>
  typeof decoded === "object" && decoded !== null;
