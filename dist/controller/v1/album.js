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
exports.getAlbumSongById = exports.getSearchedAlbum = void 0;
const apiEndpoint_1 = require("../../microServices/apiEndpoint");
const getFormatedResponse_1 = __importDefault(require("../../utlis/getFormatedResponse"));
const songHelper_1 = require("../../utlis/songHelper");
const customError_1 = __importDefault(require("../../middleware/customError"));
//getSearchAlbum =>api/v1/album
const getSearchedAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { query, limit = 50, skip = 0 } = req.query;
    if (!query)
        throw new customError_1.default("Search query is Required", 400);
    const queryStr = `?query=${query}&limit=${limit}&skip=${skip}`;
    const { data } = yield apiEndpoint_1.api.get(apiEndpoint_1.micorServiceEndpoint.album.searchAlbum + queryStr);
    let formatedAlbum = [];
    if (data.success) {
        const albums = (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.results;
        yield (0, songHelper_1.getFormatedAlbum)(albums, formatedAlbum);
    }
    res.status(200).json((0, getFormatedResponse_1.default)({
        message: "Searched Alumb successfully",
        data: formatedAlbum,
    }));
});
exports.getSearchedAlbum = getSearchedAlbum;
//getSongByAlbumId =>api/v1/album/:albumId
const getAlbumSongById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { albumId } = req.params;
    if (!albumId)
        throw new customError_1.default("Invalid SongId", 400);
    const { data } = yield apiEndpoint_1.api.get(apiEndpoint_1.micorServiceEndpoint.album.searchAlbumById + `?id=${albumId}`);
    let formatedSongs = [];
    if (data.success) {
        const songs = (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.songs;
        yield (0, songHelper_1.getFormatedSong)(songs, formatedSongs);
    }
    res.status(200).json((0, getFormatedResponse_1.default)({
        message: "Searched song successfully",
        data: formatedSongs,
    }));
});
exports.getAlbumSongById = getAlbumSongById;
