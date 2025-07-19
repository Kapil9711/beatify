"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const catchAsyncError_1 = __importDefault(require("../../middleware/catchAsyncError"));
const album_1 = require("../../controller/v1/album");
const router = (0, express_1.Router)();
router.route("/").get((0, catchAsyncError_1.default)(album_1.getSearchedAlbum));
router.route("/:albumId").get((0, catchAsyncError_1.default)(album_1.getAlbumSongById));
exports.default = router;
