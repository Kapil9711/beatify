import { Router } from "express";
import catchAsyncError from "../../middleware/catchAsyncError";
import {
  getArtistSongById,
  getSearchedArtist,
} from "../../controller/v1/artist";

const router = Router();

router.route("/").get(catchAsyncError(getSearchedArtist));

router.route("/:artistId").get(catchAsyncError(getArtistSongById));

export default router;
