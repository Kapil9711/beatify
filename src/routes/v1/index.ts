import { Router } from "express";
const router = Router();
import userRoutes from "./user";
import genresRoutes from "./genres";
import songRoutes from "./song";
import playlistRoutes from "./playlist";
import ablumRoutes from "./album";

router.use("/user", userRoutes);
router.use("/genres", genresRoutes);
router.use("/song", songRoutes);
router.use("/playlist", playlistRoutes);
router.use("/album", ablumRoutes);

export default router;
