export const apiBaseUrl = process.env.BASE_API_JIO;

const songs = {
  searchSong: "/search/songs",
  searchSongById: (id: string) => `/songs/${id}`,
  songsSuggestionById: (id: string) => `/songs/${id}/suggestions`,
};

const playlist = {
  searchPlaylist: "/search/playlists",
  searchPlaylistById: (id: string) => `/playlists/${id}`,
};

const album = {
  searchAlbum: "/search/albums",
  searchAlbumById: (id: string) => `/albums/${id}`,
};

const artist = {
  searchArtist: "/search/artists",
  searchArtistById: (id: string) => `/artists/${id}`,
  searchArtistSongs: (id: string) => `/artists/${id}/songs`,
  searchArtistAlbums: (id: string) => `/artists/${id}/albums`,
};

export const micorServiceEndpoint = {
  ...songs,
  ...album,
  ...playlist,
  ...artist,
};
