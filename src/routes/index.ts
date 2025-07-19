import { Router } from "express";
import v1Routes from "./v1";
import apiDocsRoutes from './api-docs'
const router = Router();

//version1
router.use("/api/v1", v1Routes);
router.use('/api-docs',apiDocsRoutes)

export default router;
