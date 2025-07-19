import axios from "axios";
import pathVariable from "../config/pathVariables";

export const apiBaseUrl = pathVariable.BASE_API_JIO;

const songs = {
  searchSong: "/search/songs",
  searchSongById: (id: string) => `/songs/${id}`,
  songsSuggestionById: (id: string) => `/songs/${id}/suggestions`,
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
  searchArtistById: (id: string) => `/artists/${id}`,
  searchArtistSongs: (id: string) => `/artists/${id}/songs`,
  searchArtistAlbums: (id: string) => `/artists/${id}/albums`,
};

export const micorServiceEndpoint = {
  songs,
  album,
  playlist,
  artist,
};
export const api = axios.create({
  baseURL: apiBaseUrl, // Your base URL
  headers: {
    "Content-Type": "application/json",
    // Add any default headers here
  },
});
