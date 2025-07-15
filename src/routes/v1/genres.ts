import { Router } from "express";
import catchAsyncError from "../../middleware/catchAsyncError";
import {
  addRemoveSong,
  createGenres,
  getGenresList,
} from "../../controller/v1/genres";
import validate from "../../middleware/validation";
import { genresSchema, genresSongSchema } from "../../types/zodSchema";

const router = Router();

router.route("/list").get(catchAsyncError(getGenresList));
router.route("/").post(validate(genresSchema), catchAsyncError(createGenres));

router
  .route("/add-remove-song/:genreId")
  .post(validate(genresSongSchema), catchAsyncError(addRemoveSong));

export default router;
