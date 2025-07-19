import { Router } from "express";
const router = Router();
import userRoutes from "./user";
import genresRoutes from "./genres";
import songRoutes from "./song";
router.use("/user", userRoutes);
router.use("/genres", genresRoutes);
router.use("/song", songRoutes);

export default router;
