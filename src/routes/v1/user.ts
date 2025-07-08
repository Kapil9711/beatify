import { NextFunction, Request, Response, Router } from "express";
import UserModel from "../../model/user";
import getFormatedResponse from "../../utlis/getFormatedResponse";
import CustomError from "../../middleware/customError";
import catchAsyncError from "../../middleware/catchAsyncError";
import validate from "../../middleware/validation";
import { loginUserSchema, userSchema } from "../../types/zodSchema";
import { UserInput } from "../../types/responseBodyTypes";
import {
  checkUserNameAlreadyTaken,
  createUser,
  getAllUser,
  getUser,
  getUserById,
  loginUser,
} from "../../controller/v1/user";
import { authorize, isAuthenticatedUser } from "../../middleware/auth";
const router = Router();

router.route("/").get(isAuthenticatedUser, catchAsyncError(getUser));

router
  .route("/all")
  .get(isAuthenticatedUser, authorize, catchAsyncError(getAllUser));

router.route("/").post(validate(userSchema), catchAsyncError(createUser));
router
  .route("/is-username-taken")
  .get(catchAsyncError(checkUserNameAlreadyTaken));

router
  .route("/login")
  .post(validate(loginUserSchema), catchAsyncError(loginUser));

router
  .route("/:userId")
  .post(isAuthenticatedUser, catchAsyncError(getUserById));

export default router;
