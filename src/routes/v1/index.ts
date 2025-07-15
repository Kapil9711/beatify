import { Router } from "express";
const router = Router();
import userRoutes from "./user";
import genresRoutes from "./genres";
router.use("/user", userRoutes);
router.use("/genres", genresRoutes);

export default router;
