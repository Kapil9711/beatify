"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = exports.micorServiceEndpoint = exports.apiBaseUrl = void 0;
const axios_1 = __importDefault(require("axios"));
const pathVariables_1 = __importDefault(require("../config/pathVariables"));
exports.apiBaseUrl = pathVariables_1.default.BASE_API_JIO;
const songs = {
    searchSong: "/search/songs",
    searchSongById: (id) => `/songs/${id}`,
    songsSuggestionById: (id) => `/songs/${id}/suggestions`,
};
const playlist = {
    searchPlaylist: "/search/playlists",
    searchPlaylistById: `/playlists`,
};
const album = {
    searchAlbum: "/search/albums",
    searchAlbumById: `/albums`,
};
const artist = {
    searchArtist: "/search/artists",
    searchArtistById: (id) => `/artists/${id}`,
    searchArtistSongs: (id) => `/artists/${id}/songs`,
    searchArtistAlbums: (id) => `/artists/${id}/albums`,
};
exports.micorServiceEndpoint = {
    songs,
    album,
    playlist,
    artist,
};
exports.api = axios_1.default.create({
    baseURL: exports.apiBaseUrl, // Your base URL
    headers: {
        "Content-Type": "application/json",
        // Add any default headers here
    },
});
