"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const user_1 = __importDefault(require("./user"));
const genres_1 = __importDefault(require("./genres"));
const song_1 = __importDefault(require("./song"));
const playlist_1 = __importDefault(require("./playlist"));
const album_1 = __importDefault(require("./album"));
const artist_1 = __importDefault(require("./artist"));
router.use("/user", user_1.default);
router.use("/genres", genres_1.default);
router.use("/song", song_1.default);
router.use("/playlist", playlist_1.default);
router.use("/album", album_1.default);
router.use("/artist", artist_1.default);
exports.default = router;
