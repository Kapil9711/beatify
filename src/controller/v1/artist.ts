import { Response } from "express";
import { api, micorServiceEndpoint } from "../../microServices/apiEndpoint";
import { ExtendedRequest } from "../../types/express/request";
import { SongSchema } from "../../types/schemaTypes";
import getFormatedResponse from "../../utlis/getFormatedResponse";
import {
  getFormatedAlbum,
  getFormatedArtist,
  getFormatedSong,
} from "../../utlis/songHelper";
import CustomError from "../../middleware/customError";
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
export const getSearchedArtist = async (
  req: ExtendedRequest,
  res: Response
) => {
  const { query, limit = 50, skip = 0 } = req.query;
  if (!query) throw new CustomError("Search query is Required", 400);
  const queryStr = `?query=${query}&limit=${limit}&skip=${skip}`;
  const { data } = await api.get(
    micorServiceEndpoint.artist.searchArtist + queryStr
  );
  let formatedArtist: any[] = [];
  if (data.success) {
    const artists = data?.data?.results;
    await getFormatedArtist(artists, formatedArtist);
  }

  const singleArtistPromise = [];

  for (let artist of formatedArtist) {
    try {
      const { id } = artist;
      const response = api.get(
        micorServiceEndpoint.artist.searchArtistById(id)
      );
      singleArtistPromise.push(response);
    } catch (error) {}
  }
  const promiseResult = await Promise.allSettled(singleArtistPromise);

  for (let result of promiseResult) {
    const { status } = result;
    if (status == "fulfilled") {
      try {
        const { data } = result.value;
        if (data.success) {
          const fetchedArtist = data?.data;

          const artist = formatedArtist.find(
            (artist) => artist.id == fetchedArtist.id
          );
          if (Array.isArray(fetchedArtist?.availableLanguages) && artist) {
            for (let lan of fetchedArtist?.availableLanguages) {
              if (acceptedLanguage.includes(lan)) artist.languages.push(lan);
            }
          }
        }
      } catch (error) {}
    }
  }

  res.status(200).json(
    getFormatedResponse({
      message: "Searched Artist successfully",
      data: formatedArtist,
    })
  );
};

//getSongByArtistId =>api/v1/artist/:artistId
export const getArtistSongById = async (
  req: ExtendedRequest,
  res: Response
) => {
  const { artistId } = req.params;
  const { limit = 50, skip = 0, language = "" }: any = req.query;
  if (!artistId) throw new CustomError("Invalid SongId", 400);
  const startPage = skip == 0 ? 0 : (skip * limit) / 10;
  const endPage = startPage + limit / 10;

  const totalSongs: any[] = [];
  let songsPromise = [];
  for (let i = startPage; i < endPage; i++) {
    try {
      const response = api.get(
        micorServiceEndpoint.artist.searchArtistSongs(artistId) + `?page=${i}`
      );
      songsPromise.push(response);
    } catch (error) {}
  }

  const promiseResult = await Promise.allSettled(songsPromise);

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
    } catch (error) {}
  }

  let formatedSongs: any[] = [];
  await getFormatedSong(totalSongs, formatedSongs);

  if (acceptedLanguage.includes(language)) {
    formatedSongs = formatedSongs.filter((song) => song.language == language);
  }
  res.status(200).json(
    getFormatedResponse({
      message: "Searched song successfully",
      data: formatedSongs,
    })
  );
};
