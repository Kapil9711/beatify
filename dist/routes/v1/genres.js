"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const catchAsyncError_1 = __importDefault(require("../../middleware/catchAsyncError"));
const genres_1 = require("../../controller/v1/genres");
const validation_1 = __importDefault(require("../../middleware/validation"));
const zodSchema_1 = require("../../types/zodSchema");
const router = (0, express_1.Router)();
router.route("/list").get((0, catchAsyncError_1.default)(genres_1.getGenresList));
router.route("/").post((0, validation_1.default)(zodSchema_1.genresSchema), (0, catchAsyncError_1.default)(genres_1.createGenres));
router
    .route("/add-remove-song/:genreId")
    .post((0, validation_1.default)(zodSchema_1.genresSongsSchema), (0, catchAsyncError_1.default)(genres_1.addRemoveSong));
router
    .route("/seed-song")
    .post((0, validation_1.default)(zodSchema_1.seedGenreSongSchema), (0, catchAsyncError_1.default)(genres_1.seedGenreSong));
exports.default = router;
