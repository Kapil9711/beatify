import { Router } from "express";
import catchAsyncError from "../../middleware/catchAsyncError";
import {
  getSearchedSong,
  getSongById,
  getSongSuggestion,
} from "../../controller/v1/song";

const router = Router();

router.route("/").get(catchAsyncError(getSearchedSong));
router.route("/suggestion").get(catchAsyncError(getSongSuggestion));
router.route("/:songId").get(catchAsyncError(getSongById));

export default router;
