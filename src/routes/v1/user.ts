import { NextFunction, Request, Response, Router } from "express";
import UserModel from "../../model/user";
import getFormatedResponse from "../../utlis/getFormatedResponse";
import CustomError from "../../middleware/customError";
import catchAsyncError from "../../middleware/catchAsyncError";
import validate from "../../middleware/validation";
import { userSchema } from "../../types/zodSchema";
import { UserInput } from "../../types/responseBodyTypes";
import {
  checkUserNameAlreadyTaken,
  createUser,
  getAllUser,
} from "../../controller/v1/user";
const router = Router();

router.route("/").get(catchAsyncError(getAllUser));
router.route("/").post(validate(userSchema), catchAsyncError(createUser));
router
  .route("/is-username-taken")
  .get(catchAsyncError(checkUserNameAlreadyTaken));

export default router;
