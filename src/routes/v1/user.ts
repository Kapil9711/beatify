import { NextFunction, Request, Response, Router } from "express";
import UserModel from "../../model/user";
import getFormatedResponse from "../../utlis/getFormatedResponse";
import CustomerError from "../../middleware/customerError";
import catchAsyncError from "../../middleware/catchAsyncError";
import validate from "../../middleware/validation";
import { userSchema } from "../../types/zodSchema";
import { UserInput } from "../../types/responseBodyTypes";
const router = Router();

router.route("/").get(
  catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserModel.find({});
    const formatedResponse = getFormatedResponse({
      message: "User Fetched Successfully",
      data: users,
    });
    res.status(200).json(formatedResponse);
  })
);

router.route("/").post(
  validate(userSchema),
  catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const userInput: UserInput = req.body;
    res.status(200).json(getFormatedResponse());
  })
);

export default router;
