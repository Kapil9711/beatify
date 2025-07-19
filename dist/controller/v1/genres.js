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
exports.seedGenreSong = exports.addRemoveSong = exports.createGenres = exports.getGenresList = void 0;
const genres_1 = __importDefault(require("../../model/genres"));
const getFormatedResponse_1 = __importDefault(require("../../utlis/getFormatedResponse"));
const customError_1 = __importDefault(require("../../middleware/customError"));
const mongoose_1 = require("mongoose");
const apiEndpoint_1 = require("../../microServices/apiEndpoint");
const songHelper_1 = require("../../utlis/songHelper");
//getGenresList => /api/v1/genres/list
const getGenresList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type = "more" } = req.query;
    let genres = [];
    if (type == "more") {
        genres = yield genres_1.default.find({ isActive: true });
    }
    if (type == "less") {
        genres = yield genres_1.default.find({ isActive: true }).select("name totalSongs");
    }
    res.status(200).json((0, getFormatedResponse_1.default)({
        isSuccess: true,
        message: "Genres Fetched SuccessFully",
        data: genres,
    }));
});
exports.getGenresList = getGenresList;
//createGenres=>/api/v1/genres
const createGenres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { songs, name } = req.body;
    name = String(name).toLowerCase();
    const isExist = yield genres_1.default.findOne({ name });
    if (isExist)
        throw new customError_1.default("Genres already exists", 400);
    const genres = yield genres_1.default.create(Object.assign(Object.assign({}, req.body), { totalSongs: songs.length }));
    res.status(201).json((0, getFormatedResponse_1.default)({
        isSuccess: true,
        data: genres,
        message: "Genres created successfully",
    }));
});
exports.createGenres = createGenres;
//addRemoveSongInGenreByGenreId =>/api/v1/genres/add-remove-song/genreId
const addRemoveSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { genreId } = req.params;
    let { songs, type } = req.body;
    if (!(0, mongoose_1.isValidObjectId)(genreId))
        throw new customError_1.default("Invalid GenreId", 400);
    const isExist = yield genres_1.default.findById(genreId).select("songs.id");
    if (!isExist)
        throw new customError_1.default("Genre Not Found", 400);
    let updatedGenre = null;
    if (type == "add") {
        songs = songs.filter((song) => { var _a; return !((_a = isExist === null || isExist === void 0 ? void 0 : isExist.songs) === null || _a === void 0 ? void 0 : _a.some((item) => (item === null || item === void 0 ? void 0 : item.id) == song.id)); });
        updatedGenre = yield genres_1.default.findByIdAndUpdate(genreId, {
            $push: { songs: { $each: songs } },
        }, { new: true });
    }
    if (type == "remove") {
        const songsId = songs.map((song) => song.id);
        updatedGenre = yield genres_1.default.findByIdAndUpdate(genreId, {
            $pull: {
                songs: {
                    id: { $in: songsId },
                },
            },
        }, { new: true });
    }
    if (!updatedGenre)
        throw new customError_1.default("Songs not updated", 400);
    const updateGenreWithLength = yield genres_1.default.findByIdAndUpdate(genreId, {
        $set: { totalSongs: (_a = updatedGenre === null || updatedGenre === void 0 ? void 0 : updatedGenre.songs) === null || _a === void 0 ? void 0 : _a.length },
    }, { new: true });
    return res.status(201).json((0, getFormatedResponse_1.default)({
        isSuccess: true,
        data: updateGenreWithLength,
        message: type == "add"
            ? "Songs Added Successfully"
            : "Songs Removed Successfully ",
    }));
});
exports.addRemoveSong = addRemoveSong;
//seedSong =>/api/v1/genres/seed-song
const seedGenreSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let { name } = req.body;
    name = String(name).toLowerCase();
    let language = ["hindi", "punjabi"];
    const allPlaylistId = [];
    for (let item of language) {
        let query = name + " " + item;
        try {
            const { data } = yield apiEndpoint_1.api.get(apiEndpoint_1.micorServiceEndpoint.playlist.searchPlaylist +
                `?query=${query}&limit=10`);
            if (data.success) {
                const playlists = (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.results;
                if (Array.isArray(playlists)) {
                    for (let playlist of playlists) {
                        let { id, name: playlistName } = playlist;
                        if (id && playlistName) {
                            if (playlistName.toLowerCase().includes(name)) {
                                allPlaylistId.push(id);
                            }
                        }
                    }
                }
            }
        }
        catch (error) { }
    }
    let songsFromPlaylist = [];
    for (let id of allPlaylistId) {
        try {
            const { data } = yield apiEndpoint_1.api.get(apiEndpoint_1.micorServiceEndpoint.playlist.searchPlaylistById + `?id=${id}&limit=50`);
            if (data.success) {
                const songs = (_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.songs;
                yield (0, songHelper_1.getFormatedSong)(songs, songsFromPlaylist);
            }
        }
        catch (error) { }
    }
    console.log("Total songs from Playlist", songsFromPlaylist.length);
    let isExist = null;
    isExist = yield genres_1.default.findOne({ name: name }).select("name");
    if (!isExist) {
        console.log("Genre not Exist, creating new Genre");
        isExist = yield genres_1.default.create({ name });
    }
    const genreList = yield genres_1.default.find({})
        .select("name -_id songs.id")
        .lean();
    if (genreList.length === 0)
        throw new customError_1.default("No genre found in DB", 400);
    let formatedGenreData = {};
    for (let genre of genreList) {
        const { name, songs } = genre;
        for (let song of songs) {
            const { id } = song;
            if (formatedGenreData[name]) {
                formatedGenreData[name][id] = true;
            }
            else {
                formatedGenreData[name] = { [id]: true };
            }
        }
    }
    let songsAfterRemoveDubplicate = [];
    if (Object.keys(formatedGenreData).length > 0) {
        for (let song of songsFromPlaylist) {
            const { id } = song;
            let flag = false;
            if (id) {
                for (let key in formatedGenreData) {
                    const value = formatedGenreData[key];
                    if (value[id])
                        flag = true;
                }
            }
            if (!flag) {
                songsAfterRemoveDubplicate.push(song);
            }
        }
    }
    else {
        songsAfterRemoveDubplicate = songsFromPlaylist;
    }
    req.params = { genreId: isExist.id };
    req.body = { type: "add", songs: songsAfterRemoveDubplicate };
    console.log("filtered Songs Length", songsAfterRemoveDubplicate.length);
    yield (0, exports.addRemoveSong)(req, res);
});
exports.seedGenreSong = seedGenreSong;
