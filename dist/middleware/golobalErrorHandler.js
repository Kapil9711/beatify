"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pathVariables_1 = __importDefault(require("../config/pathVariables"));
const getFormatedResponse_1 = __importDefault(require("../utlis/getFormatedResponse"));
const customError_1 = __importDefault(require("./customError"));
const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    if (pathVariables_1.default.NODE_ENV === "development") {
        res.status(err.statusCode).json({
            isSuccess: false,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    }
    if (pathVariables_1.default.NODE_ENV === "production") {
        let error = Object.assign({}, err);
        error.message = err.message;
        // Wrong Mongoose Object ID Error
        if (err.name === "CastError") {
            const message = `Resource not found. Invalid: ${err.path}`;
            error = new customError_1.default(message, 404);
        }
        // Handling Mongoose Validation Error
        if (err.name === "ValidationError") {
            const message = Object.values(err.errors).map((value) => value.message);
            error = new customError_1.default(message, 400);
        }
        // Handle mongoose duplicate key error
        if (err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} entered.`;
            error = new customError_1.default(message, 400);
        }
        // Handling Wrong JWT token error
        if (err.name === "JsonWebTokenError") {
            const message = "JSON Web token is invalid. Try Again!";
            error = new customError_1.default(message, 500);
        }
        // Handling Expired JWT token error
        if (err.name === "TokenExpiredError") {
            const message = "JSON Web token is expired. Try Again!";
            error = new customError_1.default(message, 500);
        }
        res.status(error.statusCode).json((0, getFormatedResponse_1.default)({
            isSuccess: false,
            message: error.message || "Internal Server Error",
        }));
    }
};
exports.default = globalErrorHandler;
