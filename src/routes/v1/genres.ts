import { Router } from "express";
import catchAsyncError from "../../middleware/catchAsyncError";
import {
  addRemoveSong,
  createGenres,
  getGenresList,
  seedGenreSong,
} from "../../controller/v1/genres";
import validate from "../../middleware/validation";
import {
  genresSchema,
  genresSongsSchema,
  seedGenreSongSchema,
} from "../../types/zodSchema";

const router = Router();

router.route("/list").get(catchAsyncError(getGenresList));
router.route("/").post(validate(genresSchema), catchAsyncError(createGenres));

router
  .route("/add-remove-song/:genreId")
  .post(validate(genresSongsSchema), catchAsyncError(addRemoveSong));

router
  .route("/seed-song")
  .post(validate(seedGenreSongSchema), catchAsyncError(seedGenreSong));

export default router;
