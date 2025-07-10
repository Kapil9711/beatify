import { NextFunction, Request, Response } from "express";
import UserModel from "../../model/user";
import getFormatedResponse from "../../utlis/getFormatedResponse";
import { UserInput, UserLoginInput } from "../../types/responseBodyTypes";
import CustomError from "../../middleware/customError";
import bcypt from "bcrypt";
import jwt from "jsonwebtoken";
import pathVariable from "../../config/pathVariables";
import { ExtendedRequest } from "../../types/express/request";
import { isValidObjectId } from "mongoose";

//getAllUser => /api/v1/user
export const getAllUser = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const users = await UserModel.find({});
  const formatedResponse = getFormatedResponse({
    message: "User Fetched Successfully",
    data: users,
  });
  res.status(200).json(formatedResponse);
};

//createUser => /api/v1/user
export const createUser = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const userInput: UserInput = req.body;
  const isExist = await UserModel.findOne({ email: userInput.email });
  if (isExist) throw new CustomError("User Already Exist", 400);
  const user = await UserModel.create(userInput);
  const { userName, profileImage, email } = user;
  return res.status(200).json(
    getFormatedResponse({
      message: "User Created Successfully",
      data: { userName, profileImage, email },
    })
  );
};

//createUser => /api/v1/user
export const checkUserNameAlreadyTaken = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const { userName }: any = req.query;
  if (!userName) throw new CustomError("UserName is Required", 400);
  const isExist = await UserModel.findOne({ userName: userName });
  if (isExist)
    return res.status(200).json(
      getFormatedResponse({
        message: "Username Already Taken",
        isSuccess: true,
      })
    );

  res.status(200).json(
    getFormatedResponse({
      message: "Username Available",
      isSuccess: false,
    })
  );
};

//loginUser => /api/v1/user/login
export const loginUser = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const { email, password }: UserLoginInput = req.body;

  const isExist = await UserModel.findOne({
    email: email,
  })
    .select("userName email password profileImage")
    .lean();

  if (!isExist) throw new CustomError("User Not Found", 400);
  const isPasswordMatch = await bcypt.compare(password, isExist.password);

  if (!isPasswordMatch)
    throw new CustomError("Username or Password Incorrect", 400);
  const payload: any = {
    userName: isExist.userName,
    email: isExist.email,
    id: isExist._id,
  };
  const options = { expiresIn: pathVariable.JWT_EXPIRE_TIME };
  var token = jwt.sign(payload, pathVariable.JWT_SECRET, options as any);
  const formatedResponse = getFormatedResponse({
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
    .json({ ...formatedResponse, token });
};

//getUserById => /api/v1/user/:userId
export const getUserById = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  if (!isValidObjectId(userId)) {
    throw new CustomError("Invalid User Id", 400);
  }
  const isExist = await UserModel.findById(userId)
    .select("userName email profileImage")
    .lean();
  if (!isExist) throw new CustomError("User Not Found", 400);
  const payload: any = {
    userName: isExist.userName,
    email: isExist.email,
    profileImage: isExist.profileImage,
    id: isExist._id,
  };
  return res.status(200).json(
    getFormatedResponse({
      isSuccess: true,
      message: "User Found Successfully",
      data: payload,
    })
  );
};

//getSingleUser => /api/v1/user
export const getUser = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const isExist = req.user;
  if (!isExist) throw new CustomError("User Not Found", 400);
  const payload: any = {
    userName: isExist.userName,
    email: isExist.email,
    profileImage: isExist.profileImage,
    id: isExist._id,
  };
  return res.status(200).json(
    getFormatedResponse({
      isSuccess: true,
      message: "User Found Successfully",
      data: payload,
    })
  );
};
