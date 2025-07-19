"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = __importDefault(require("./customError"));
const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        const message = result.error.errors
            .map((e) => `${e.path.join(".")}: ${e.message}`)
            .join(", ");
        return next(new customError_1.default(message, 400));
    }
    // Attach validated data to req
    req.body = result.data;
    next();
};
exports.default = validate;
