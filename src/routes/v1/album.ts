import { Router } from "express";
import catchAsyncError from "../../middleware/catchAsyncError";

import { getAlbumSongById, getSearchedAlbum } from "../../controller/v1/album";

const router = Router();

router.route("/").get(catchAsyncError(getSearchedAlbum));
router.route("/:albumId").get(catchAsyncError(getAlbumSongById));

export default router;
