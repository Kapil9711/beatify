import { NextFunction, Response, Router } from "express";
import { authorize, isAuthenticatedUser } from "../../middleware/auth";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../../swagger";
import catchAsyncError from "../../middleware/catchAsyncError";
import { ExtendedRequest } from "../../types/express/request";
import apiDocsHandler from "../../middleware/apiDocsHandler";
import express from "express";
import path from "node:path";
const router = Router();

router.route("/login").get(
  apiDocsHandler,
  isAuthenticatedUser,
  authorize,
  catchAsyncError(
    async (req: ExtendedRequest, res: Response, next: NextFunction) => {
      res.render("login");
    }
  )
);

router.use(
  "/api-docs",
  express.static(path.join(__dirname, "../node_modules/swagger-ui-dist"))
);

router.use(
  "/",
  apiDocsHandler,
  isAuthenticatedUser,
  authorize,
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

export default router;
