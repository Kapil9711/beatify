"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const genresSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    totalSongs: {
        type: Number,
        required: true,
        default: 0,
    },
    songs: {
        type: [Object],
    },
    playlistIds: {
        type: [String],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});
// userSchema.index({ userName: 1 });
const GenresModel = mongoose_1.default.model("Genres", genresSchema);
exports.default = GenresModel;
