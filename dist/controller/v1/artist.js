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
exports.getArtistSongById = exports.getSearchedArtist = void 0;
const apiEndpoint_1 = require("../../microServices/apiEndpoint");
const getFormatedResponse_1 = __importDefault(require("../../utlis/getFormatedResponse"));
const songHelper_1 = require("../../utlis/songHelper");
const customError_1 = __importDefault(require("../../middleware/customError"));
let acceptedLanguage = [
    "hindi",
    "punjabi",
    "english",
    "haryanvi",
    "telugu",
    "tamil",
    "kannada",
];
//getSearchArtist =>api/v1/artist
const getSearchedArtist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { query, limit = 50, skip = 0 } = req.query;
    if (!query)
        throw new customError_1.default("Search query is Required", 400);
    const queryStr = `?query=${query}&limit=${limit}&skip=${skip}`;
    const { data } = yield apiEndpoint_1.api.get(apiEndpoint_1.micorServiceEndpoint.artist.searchArtist + queryStr);
    let formatedArtist = [];
    if (data.success) {
        const artists = (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.results;
        yield (0, songHelper_1.getFormatedArtist)(artists, formatedArtist);
    }
    const singleArtistPromise = [];
    for (let artist of formatedArtist) {
        try {
            const { id } = artist;
            const response = apiEndpoint_1.api.get(apiEndpoint_1.micorServiceEndpoint.artist.searchArtistById(id));
            singleArtistPromise.push(response);
        }
        catch (error) { }
    }
    const promiseResult = yield Promise.allSettled(singleArtistPromise);
    for (let result of promiseResult) {
        const { status } = result;
        if (status == "fulfilled") {
            try {
                const { data } = result.value;
                if (data.success) {
                    const fetchedArtist = data === null || data === void 0 ? void 0 : data.data;
                    const artist = formatedArtist.find((artist) => artist.id == fetchedArtist.id);
                    if (Array.isArray(fetchedArtist === null || fetchedArtist === void 0 ? void 0 : fetchedArtist.availableLanguages) && artist) {
                        for (let lan of fetchedArtist === null || fetchedArtist === void 0 ? void 0 : fetchedArtist.availableLanguages) {
                            if (acceptedLanguage.includes(lan))
                                artist.languages.push(lan);
                        }
                    }
                }
            }
            catch (error) { }
        }
    }
    res.status(200).json((0, getFormatedResponse_1.default)({
        message: "Searched Artist successfully",
        data: formatedArtist,
    }));
});
exports.getSearchedArtist = getSearchedArtist;
//getSongByArtistId =>api/v1/artist/:artistId
const getArtistSongById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { artistId } = req.params;
    const { limit = 50, skip = 0, language = "" } = req.query;
    if (!artistId)
        throw new customError_1.default("Invalid SongId", 400);
    const startPage = skip == 0 ? 0 : (skip * limit) / 10;
    const endPage = startPage + limit / 10;
    const totalSongs = [];
    let songsPromise = [];
    for (let i = startPage; i < endPage; i++) {
        try {
            const response = apiEndpoint_1.api.get(apiEndpoint_1.micorServiceEndpoint.artist.searchArtistSongs(artistId) + `?page=${i}`);
            songsPromise.push(response);
        }
        catch (error) { }
    }
    const promiseResult = yield Promise.allSettled(songsPromise);
    for (let result of promiseResult) {
        try {
            if (result.status == "fulfilled") {
                const { data } = result.value;
                if (data.success) {
                    const songs = data.data.songs;
                    if (Array.isArray(songs)) {
                        totalSongs.push(...songs);
                    }
                }
            }
        }
        catch (error) { }
    }
    let formatedSongs = [];
    yield (0, songHelper_1.getFormatedSong)(totalSongs, formatedSongs);
    if (acceptedLanguage.includes(language)) {
        formatedSongs = formatedSongs.filter((song) => song.language == language);
    }
    res.status(200).json((0, getFormatedResponse_1.default)({
        message: "Searched song successfully",
        data: formatedSongs,
    }));
});
exports.getArtistSongById = getArtistSongById;
