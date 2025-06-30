import { NextFunction, Request, Response } from "express";
import UserModel from "../../model/user";
import getFormatedResponse from "../../utlis/getFormatedResponse";
import { UserInput } from "../../types/responseBodyTypes";
import CustomError from "../../middleware/customError";

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
