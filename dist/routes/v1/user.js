"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const catchAsyncError_1 = __importDefault(require("../../middleware/catchAsyncError"));
const validation_1 = __importDefault(require("../../middleware/validation"));
const zodSchema_1 = require("../../types/zodSchema");
const user_1 = require("../../controller/v1/user");
const auth_1 = require("../../middleware/auth");
const router = (0, express_1.Router)();
router.route("/").get(auth_1.isAuthenticatedUser, (0, catchAsyncError_1.default)(user_1.getUser));
router
    .route("/all")
    .get(auth_1.isAuthenticatedUser, auth_1.authorize, (0, catchAsyncError_1.default)(user_1.getAllUser));
router.route("/").post((0, validation_1.default)(zodSchema_1.userSchema), (0, catchAsyncError_1.default)(user_1.createUser));
router
    .route("/is-username-taken")
    .get((0, catchAsyncError_1.default)(user_1.checkUserNameAlreadyTaken));
router
    .route("/login")
    .post((0, validation_1.default)(zodSchema_1.loginUserSchema), (0, catchAsyncError_1.default)(user_1.loginUser));
router
    .route("/:userId")
    .post(auth_1.isAuthenticatedUser, (0, catchAsyncError_1.default)(user_1.getUserById));
exports.default = router;
