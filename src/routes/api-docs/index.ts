import { NextFunction, Response, Router } from "express";
import { authorize, isAuthenticatedUser } from "../../middleware/auth";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../../swagger";
import catchAsyncError from "../../middleware/catchAsyncError";
import { ExtendedRequest } from "../../types/express/request";
import apiDocsHandler from "../../middleware/apiDocsHandler";
const router = Router();

router.route("/login").get(
  catchAsyncError(
    async (req: ExtendedRequest, res: Response, next: NextFunction) => {
      res.render("login");
    }
  )
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
