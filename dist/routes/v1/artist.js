"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const catchAsyncError_1 = __importDefault(require("../../middleware/catchAsyncError"));
const artist_1 = require("../../controller/v1/artist");
const router = (0, express_1.Router)();
router.route("/").get((0, catchAsyncError_1.default)(artist_1.getSearchedArtist));
router.route("/:artistId").get((0, catchAsyncError_1.default)(artist_1.getArtistSongById));
exports.default = router;
