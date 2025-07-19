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
exports.getUser = exports.getUserById = exports.loginUser = exports.checkUserNameAlreadyTaken = exports.createUser = exports.getAllUser = void 0;
const user_1 = __importDefault(require("../../model/user"));
const getFormatedResponse_1 = __importDefault(require("../../utlis/getFormatedResponse"));
const customError_1 = __importDefault(require("../../middleware/customError"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const pathVariables_1 = __importDefault(require("../../config/pathVariables"));
const mongoose_1 = require("mongoose");
//getAllUser => /api/v1/user
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.find({});
    const formatedResponse = (0, getFormatedResponse_1.default)({
        message: "User Fetched Successfully",
        data: users,
    });
    res.status(200).json(formatedResponse);
});
exports.getAllUser = getAllUser;
//createUser => /api/v1/user
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userInput = req.body;
    const isExist = yield user_1.default.findOne({ email: userInput.email });
    if (isExist)
        throw new customError_1.default("User Already Exist", 400);
    const user = yield user_1.default.create(userInput);
    const { userName, profileImage, email } = user;
    return res.status(200).json((0, getFormatedResponse_1.default)({
        message: "User Created Successfully",
        data: { userName, profileImage, email },
    }));
});
exports.createUser = createUser;
//createUser => /api/v1/user
const checkUserNameAlreadyTaken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName } = req.query;
    if (!userName)
        throw new customError_1.default("UserName is Required", 400);
    const isExist = yield user_1.default.findOne({ userName: userName });
    if (isExist)
        return res.status(200).json((0, getFormatedResponse_1.default)({
            message: "Username Already Taken",
            isSuccess: true,
        }));
    res.status(400).json((0, getFormatedResponse_1.default)({
        message: "Username Available",
        isSuccess: false,
    }));
});
exports.checkUserNameAlreadyTaken = checkUserNameAlreadyTaken;
//loginUser => /api/v1/user/login
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const isExist = yield user_1.default.findOne({
        email: email,
    })
        .select("userName email password profileImage")
        .lean();
    if (!isExist)
        throw new customError_1.default("User Not Found", 400);
    const isPasswordMatch = yield bcrypt_1.default.compare(password, isExist.password);
    if (!isPasswordMatch)
        throw new customError_1.default("Username or Password Incorrect", 400);
    const payload = {
        userName: isExist.userName,
        email: isExist.email,
        id: isExist._id,
    };
    const options = { expiresIn: pathVariables_1.default.JWT_EXPIRE_TIME };
    var token = jsonwebtoken_1.default.sign(payload, pathVariables_1.default.JWT_SECRET, options);
    const formatedResponse = (0, getFormatedResponse_1.default)({
        message: "Login Successfull",
        isSuccess: true,
        data: {
            userName: isExist.userName,
            email: isExist.email,
            profileImage: isExist.profileImage,
        },
    });
    return res
        .status(200)
        .cookie("token", token, {
        httpOnly: false, // Prevent XSS attacks
        // secure: process.env.NODE_ENV === "production", // HTTPS only in production
        // sameSite: "strict", // CSRF protection
        maxAge: 24 * 60 * 60 * 1000, // 1 day expiry (in milliseconds)
    })
        .json(Object.assign(Object.assign({}, formatedResponse), { token }));
});
exports.loginUser = loginUser;
//getUserById => /api/v1/user/:userId
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!(0, mongoose_1.isValidObjectId)(userId)) {
        throw new customError_1.default("Invalid User Id", 400);
    }
    const isExist = yield user_1.default.findById(userId)
        .select("userName email profileImage")
        .lean();
    if (!isExist)
        throw new customError_1.default("User Not Found", 400);
    const payload = {
        userName: isExist.userName,
        email: isExist.email,
        profileImage: isExist.profileImage,
        id: isExist._id,
    };
    return res.status(200).json((0, getFormatedResponse_1.default)({
        isSuccess: true,
        message: "User Found Successfully",
        data: payload,
    }));
});
exports.getUserById = getUserById;
//getSingleUser => /api/v1/user
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = req.user;
    if (!isExist)
        throw new customError_1.default("User Not Found", 400);
    const payload = {
        userName: isExist.userName,
        email: isExist.email,
        profileImage: isExist.profileImage,
        id: isExist._id,
    };
    return res.status(200).json((0, getFormatedResponse_1.default)({
        isSuccess: true,
        message: "User Found Successfully",
        data: payload,
    }));
});
exports.getUser = getUser;
