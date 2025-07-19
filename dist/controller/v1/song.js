"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSongSuggestion = exports.getSongById = exports.getSearchedSong = void 0;
const apiEndpoint_1 = require("../../microServices/apiEndpoint");
const getFormatedResponse_1 = __importDefault(require("../../utlis/getFormatedResponse"));
const songHelper_1 = require("../../utlis/songHelper");
const customError_1 = __importDefault(require("../../middleware/customError"));
//getSearchSongs =>api/v1/song
const getSearchedSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { query, limit = 50, skip = 0 } = req.query;
    if (!query)
        throw new customError_1.default("Search query is Required", 400);
    const queryStr = `?query=${query}&limit=${limit}&skip=${skip}`;
    const { data } = yield apiEndpoint_1.api.get(apiEndpoint_1.micorServiceEndpoint.songs.searchSong + queryStr);
    let formatedSongs = [];
    if (data.success) {
        const songs = (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.results;
        yield (0, songHelper_1.getFormatedSong)(songs, formatedSongs);
    }
    res.status(200).json((0, getFormatedResponse_1.default)({
        message: "Searched songs successfully",
        data: formatedSongs,
    }));
});
exports.getSearchedSong = getSearchedSong;
//getSongById =>api/v1/song/:songId
const getSongById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { songId } = req.params;
    if (!songId)
        throw new customError_1.default("Invalid SongId", 400);
    const { data } = yield apiEndpoint_1.api.get(apiEndpoint_1.micorServiceEndpoint.songs.searchSongById(songId));
    let formatedSongs = [];
    if (data.success) {
        const songs = data === null || data === void 0 ? void 0 : data.data;
        yield (0, songHelper_1.getFormatedSong)(songs, formatedSongs);
    }
    res.status(200).json((0, getFormatedResponse_1.default)({
        message: "Searched song successfully",
        data: formatedSongs[0] ? formatedSongs[0] : null,
    }));
});
exports.getSongById = getSongById;
//getSongSuggestionBySongId =>api/v1/song/suggestion
const getSongSuggestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { songId = "", limit = 50, skip = 0 } = req.query;
    if (!songId)
        throw new customError_1.default("SongId is Required", 400);
    const queryStr = `?limit=${limit}&skip=${skip}`;
    const { data } = yield apiEndpoint_1.api.get(apiEndpoint_1.micorServiceEndpoint.songs.songsSuggestionById(songId) + queryStr);
    let formatedSongs = [];
    if (data.success) {
        const songs = data === null || data === void 0 ? void 0 : data.data;
        yield (0, songHelper_1.getFormatedSong)(songs, formatedSongs);
    }
    res.status(200).json((0, getFormatedResponse_1.default)({
        message: "Song suggested successfully",
        data: formatedSongs,
    }));
});
exports.getSongSuggestion = getSongSuggestion;
