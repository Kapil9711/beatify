import pathVariable from "../config/pathVariables";
import getFormatedResponse from "../utlis/getFormatedResponse";
import CustomerError from "./customerError";
import { Request, Response, NextFunction } from "express";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;

  if (pathVariable.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      isSuccess: false,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  if (pathVariable.NODE_ENV === "production") {
    let error = { ...err };

    error.message = err.message;

    // Wrong Mongoose Object ID Error
    if (err.name === "CastError") {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new CustomerError(message, 404);
    }

    // Handling Mongoose Validation Error
    if (err.name === "ValidationError") {
      const message: any = Object.values(err.errors).map(
        (value: any) => value.message
      );
      error = new CustomerError(message, 400);
    }

    // Handle mongoose duplicate key error
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered.`;
      error = new CustomerError(message, 400);
    }

    // Handling Wrong JWT token error
    if (err.name === "JsonWebTokenError") {
      const message = "JSON Web token is invalid. Try Again!";
      error = new CustomerError(message, 500);
    }

    // Handling Expired JWT token error
    if (err.name === "TokenExpiredError") {
      const message = "JSON Web token is expired. Try Again!";
      error = new CustomerError(message, 500);
    }

    res.status(error.statusCode).json(
      getFormatedResponse({
        isSuccess: false,
        message: error.message || "Internal Server Error",
      })
    );
  }
};

export default globalErrorHandler;
