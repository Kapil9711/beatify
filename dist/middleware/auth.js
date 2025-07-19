"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.isAuthenticatedUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../model/user"));
const catchAsyncError_1 = __importDefault(require("./catchAsyncError"));
const customError_1 = __importDefault(require("./customError"));
const pathVariables_1 = __importDefault(require("../config/pathVariables"));
// Check if the user is authenticated
exports.isAuthenticatedUser = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // 1. Extract token from Authorization header
    let token;
    if ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.startsWith("Bearer")) {
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
        throw new customError_1.default("Login first to access this resource.", 401);
    }
    // 5. Verify JWT token
    let decoded;
    try {
        decoded = jsonwebtoken_1.default.verify(token, pathVariables_1.default.JWT_SECRET);
    }
    catch (error) {
        if (isLoginPage(req.originalUrl))
            return next();
        if (isApiDocsPage(req.originalUrl))
            return redirectToLogin(res);
        throw new customError_1.default("Invalid JWT token", 401);
    }
    // 6. Validate token payload
    if (!isValidJwtPayload(decoded)) {
        if (isLoginPage(req.originalUrl))
            return next();
        if (isApiDocsPage(req.originalUrl))
            return redirectToLogin(res);
        throw new customError_1.default("Invalid JWT token", 401);
    }
    const payload = decoded;
    // 7. Find user in database
    const user = yield user_1.default.findById(payload.id).select("isAdmin userName email profileImage");
    if (!user) {
        if (isLoginPage(req.originalUrl))
            return next();
        if (isApiDocsPage(req.originalUrl))
            return redirectToLogin(res);
        throw new customError_1.default("User not found", 404);
    }
    // 8. Redirect if already logged in and accessing login page
    if (isLoginPage(req.originalUrl)) {
        return res.redirect("/api-docs");
    }
    // 9. Attach user to request and proceed
    req.user = user;
    next();
}));
// Handle user authorization based on roles
exports.authorize = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // 1. Allow access to login page without token
    if (isLoginPage(req.originalUrl)) {
        return next();
    }
    // 2. Allow admin access
    if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.isAdmin) {
        return next();
    }
    // 3. Redirect to login if trying to access docs
    if (isApiDocsPage(req.originalUrl)) {
        return redirectToLogin(res);
    }
    // 4. Reject unauthorized access
    throw new customError_1.default("Not authorized to access this resource", 403);
}));
// Helper functions
const isLoginPage = (path) => path === "/api-docs/login" || path === "/api-docs/login/";
const isApiDocsPage = (path) => path === "/api-docs" || path === "/api-docs/";
const redirectToLogin = (res) => res.redirect(302, "/api-docs/login");
const isValidJwtPayload = (decoded) => typeof decoded === "object" && decoded !== null;
