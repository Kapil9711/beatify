import { SongSchema } from "../types/zodSchema";

const downloadUrlOjb: any = {
  "320kbps": "veryHigh",
  "160kbps": "high",
  "96kbps": "medium",
  "48kbps": "low",
};

export const getFormatedSong = async (songs: [any], arrayToPush: any[]) => {
  if (Array.isArray(songs)) {
    for (let song of songs) {
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
      try {
        await SongSchema.parse(formatedSongObj);
        arrayToPush.push(formatedSongObj);
      } catch (error) {}
    }
  }
};
