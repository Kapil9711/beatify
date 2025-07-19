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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormatedArtist = exports.getFormatedAlbum = exports.getFormatedPlaylist = exports.getFormatedSong = void 0;
const zodSchema_1 = require("../types/zodSchema");
const downloadUrlOjb = {
    "320kbps": "veryHigh",
    "160kbps": "high",
    "96kbps": "medium",
    "48kbps": "low",
};
const getFormatedSong = (songs, arrayToPush) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    if (Array.isArray(songs)) {
        for (let song of songs) {
            try {
                const primary = (_a = song === null || song === void 0 ? void 0 : song.artists) === null || _a === void 0 ? void 0 : _a.primary;
                const artistName = primary === null || primary === void 0 ? void 0 : primary.reduce((acc, curr) => acc + (curr === null || curr === void 0 ? void 0 : curr.name) + ", ", "");
                const artistImage = (_c = (_b = primary[0]) === null || _b === void 0 ? void 0 : _b.image[2]) === null || _c === void 0 ? void 0 : _c.url;
                let downloadUrl = {};
                for (let value of song.downloadUrl) {
                    if (downloadUrlOjb[value.quality]) {
                        downloadUrl[downloadUrlOjb[value.quality]] = value.url;
                    }
                }
                const formatedSongObj = {
                    name: song === null || song === void 0 ? void 0 : song.name,
                    id: song === null || song === void 0 ? void 0 : song.id,
                    playCount: (song === null || song === void 0 ? void 0 : song.playCount) ? song === null || song === void 0 ? void 0 : song.playCount : 0,
                    language: song === null || song === void 0 ? void 0 : song.language,
                    duration: String(song === null || song === void 0 ? void 0 : song.duration),
                    artistImage: artistImage,
                    artistName: artistName,
                    songImage: (_d = song === null || song === void 0 ? void 0 : song.image[2]) === null || _d === void 0 ? void 0 : _d.url,
                    downloadUrl: downloadUrl,
                };
                yield zodSchema_1.SongSchema.parse(formatedSongObj);
                arrayToPush.push(formatedSongObj);
            }
            catch (error) { }
        }
    }
});
exports.getFormatedSong = getFormatedSong;
const getFormatedPlaylist = (playlists, arrayToPush) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (Array.isArray(playlists)) {
        for (let playlist of playlists) {
            try {
                const formatedPlaylistObj = {
                    name: playlist === null || playlist === void 0 ? void 0 : playlist.name,
                    id: playlist === null || playlist === void 0 ? void 0 : playlist.id,
                    songCount: playlist === null || playlist === void 0 ? void 0 : playlist.songCount,
                    language: playlist === null || playlist === void 0 ? void 0 : playlist.language,
                    playlistImage: (_a = playlist === null || playlist === void 0 ? void 0 : playlist.image[2]) === null || _a === void 0 ? void 0 : _a.url,
                };
                yield zodSchema_1.PlaylistSchema.parse(formatedPlaylistObj);
                arrayToPush.push(formatedPlaylistObj);
            }
            catch (error) { }
        }
    }
});
exports.getFormatedPlaylist = getFormatedPlaylist;
const getFormatedAlbum = (albums, arrayToPush) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (Array.isArray(albums)) {
        for (let album of albums) {
            try {
                const primary = (_a = album === null || album === void 0 ? void 0 : album.artists) === null || _a === void 0 ? void 0 : _a.primary;
                const artistName = primary === null || primary === void 0 ? void 0 : primary.reduce((acc, curr) => acc + (curr === null || curr === void 0 ? void 0 : curr.name) + ", ", "");
                const formatedAlbumObj = {
                    name: album === null || album === void 0 ? void 0 : album.name,
                    id: album === null || album === void 0 ? void 0 : album.id,
                    language: album === null || album === void 0 ? void 0 : album.language,
                    albumImage: (_b = album === null || album === void 0 ? void 0 : album.image[2]) === null || _b === void 0 ? void 0 : _b.url,
                    artistName,
                };
                yield zodSchema_1.AlbumSchema.parse(formatedAlbumObj);
                arrayToPush.push(formatedAlbumObj);
            }
            catch (error) { }
        }
    }
});
exports.getFormatedAlbum = getFormatedAlbum;
const getFormatedArtist = (artists, arrayToPush) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (Array.isArray(artists)) {
        for (let artist of artists) {
            try {
                const formatedPlaylistObj = {
                    name: artist === null || artist === void 0 ? void 0 : artist.name,
                    id: artist === null || artist === void 0 ? void 0 : artist.id,
                    artistImage: (_a = artist === null || artist === void 0 ? void 0 : artist.image[2]) === null || _a === void 0 ? void 0 : _a.url,
                    languages: [],
                };
                yield zodSchema_1.ArtistSchema.parse(formatedPlaylistObj);
                arrayToPush.push(formatedPlaylistObj);
            }
            catch (error) { }
        }
    }
});
exports.getFormatedArtist = getFormatedArtist;
