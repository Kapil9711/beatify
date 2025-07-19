import { AlbumSchema, PlaylistSchema, SongSchema } from "../types/zodSchema";

const downloadUrlOjb: any = {
  "320kbps": "veryHigh",
  "160kbps": "high",
  "96kbps": "medium",
  "48kbps": "low",
};

export const getFormatedSong = async (songs: [any], arrayToPush: any[]) => {
  if (Array.isArray(songs)) {
    for (let song of songs) {
      try {
        const primary = song?.artists?.primary;
        const artistName = primary?.reduce(
          (acc: string, curr: any) => acc + curr?.name + ", ",
          ""
        );
        const artistImage = primary[0]?.image[2]?.url;
        let downloadUrl: any = {};

        for (let value of song.downloadUrl) {
          if (downloadUrlOjb[value.quality]) {
            downloadUrl[downloadUrlOjb[value.quality]] = value.url;
          }
        }

        const formatedSongObj = {
          name: song?.name,
          id: song?.id,
          playCount: song?.playCount,
          language: song?.language,
          duration: String(song?.duration),
          artistImage: artistImage,
          artistName: artistName,
          songImage: song?.image[2]?.url,
          downloadUrl: downloadUrl,
        };

        await SongSchema.parse(formatedSongObj);
        arrayToPush.push(formatedSongObj);
      } catch (error) {}
    }
  }
};

export const getFormatedPlaylist = async (
  playlists: any[],
  arrayToPush: any[]
) => {
  if (Array.isArray(playlists)) {
    for (let playlist of playlists) {
      try {
        const formatedPlaylistObj = {
          name: playlist?.name,
          id: playlist?.id,
          songCount: playlist?.songCount,
          language: playlist?.language,
          playlistImage: playlist?.image[2]?.url,
        };

        await PlaylistSchema.parse(formatedPlaylistObj);
        arrayToPush.push(formatedPlaylistObj);
      } catch (error) {}
    }
  }
};

export const getFormatedAlbum = async (albums: any[], arrayToPush: any[]) => {
  if (Array.isArray(albums)) {
    for (let album of albums) {
      try {
        const primary = album?.artists?.primary;
        const artistName = primary?.reduce(
          (acc: string, curr: any) => acc + curr?.name + ", ",
          ""
        );
        const formatedAlbumObj = {
          name: album?.name,
          id: album?.id,
          language: album?.language,
          albumImage: album?.image[2]?.url,
          artistName,
        };
        await AlbumSchema.parse(formatedAlbumObj);
        arrayToPush.push(formatedAlbumObj);
      } catch (error) {}
    }
  }
};
