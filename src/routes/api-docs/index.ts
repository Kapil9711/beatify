import { NextFunction, Response, Router } from "express";
import { authorize, isAuthenticatedUser } from "../../middleware/auth";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../../swagger";
import catchAsyncError from "../../middleware/catchAsyncError";
import { ExtendedRequest } from "../../types/express/request";
const router = Router();

router
  .route("/")
  .get(
    isAuthenticatedUser,
    authorize,
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
  );
router.route("/login").get(
  catchAsyncError(
    async (req: ExtendedRequest, res: Response, next: NextFunction) => {
      res.render("login");
    }
  )
);

export default router;
