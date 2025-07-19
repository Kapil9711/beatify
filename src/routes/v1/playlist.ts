import { Router } from "express";
import catchAsyncError from "../../middleware/catchAsyncError";
import {
  getSearchedPlaylist,
  getPlaylistSongById,
} from "../../controller/v1/playlist";

const router = Router();

router.route("/").get(catchAsyncError(getSearchedPlaylist));
router.route("/:playlistId").get(catchAsyncError(getPlaylistSongById));

export default router;
