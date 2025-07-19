"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        // Optional: Maintain prototype chain for custom error
        // Optional: Set the name of the error
        this.name = "CustomError";
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
exports.default = CustomError;
