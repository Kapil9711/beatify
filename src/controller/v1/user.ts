import { NextFunction, Request, Response } from "express";
import UserModel from "../../model/user";
import getFormatedResponse from "../../utlis/getFormatedResponse";
import { UserInput, UserLoginInput } from "../../types/responseBodyTypes";
import CustomError from "../../middleware/customError";
import bcypt from "bcrypt";

//getAllUser => /api/v1/user
export const getAllUser = async (
  req: Request,
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
  req: Request,
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
  req: Request,
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
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password }: UserLoginInput = req.body;

  const isExist = await UserModel.findOne({
    email: email,
  })
    .select("userName email password profileImage")
    .lean();
  console.log(isExist);
  if (!isExist) throw new CustomError("User Not Found", 400);
  const isPasswordMatch = await bcypt.compare(password, isExist.password);

  if (!isPasswordMatch)
    throw new CustomError("Username or Password Incorrect", 401);
  return res.status(200).json(
    getFormatedResponse({
      message: "Login Successfull",
      isSuccess: true,
      data: {
        userName: isExist.userName,
        email: isExist.email,
        profileImage: isExist.profileImage,
      },
    })
  );
};
