import { Response } from "express";
import { api, micorServiceEndpoint } from "../../microServices/apiEndpoint";
import { ExtendedRequest } from "../../types/express/request";
import { SongSchema } from "../../types/schemaTypes";
import getFormatedResponse from "../../utlis/getFormatedResponse";
import { getFormatedSong } from "../../utlis/songHelper";
import CustomError from "../../middleware/customError";
import { isValidObjectId } from "mongoose";

//getSearchSongs =>api/v1/song
export const getSearchedSong = async (req: ExtendedRequest, res: Response) => {
  const { query, limit = 50, skip = 0 } = req.query;
  if (!query) throw new CustomError("Search query is Required", 400);
  const queryStr = `?query=${query}&limit=${limit}&skip=${skip}`;
  const { data } = await api.get(
    micorServiceEndpoint.songs.searchSong + queryStr
  );
  let formatedSongs: SongSchema[] = [];
  if (data.success) {
    const songs = data?.data?.results;
    await getFormatedSong(songs, formatedSongs);
  }

  res.status(200).json(
    getFormatedResponse({
      message: "Searched songs successfully",
      data: formatedSongs,
    })
  );
};

//getSongById =>api/v1/song/:songId
export const getSongById = async (req: ExtendedRequest, res: Response) => {
  const { songId } = req.params;
  if (!songId) throw new CustomError("Invalid SongId", 400);
  const { data } = await api.get(
    micorServiceEndpoint.songs.searchSongById(songId)
  );
  let formatedSongs: SongSchema[] = [];
  if (data.success) {
    const songs = data?.data;
    await getFormatedSong(songs, formatedSongs);
  }

  res.status(200).json(
    getFormatedResponse({
      message: "Searched song successfully",
      data: formatedSongs[0] ? formatedSongs[0] : null,
    })
  );
};

//getSongSuggestionBySongId =>api/v1/song/suggestion
export const getSongSuggestion = async (
  req: ExtendedRequest,
  res: Response
) => {
  const { songId = "", limit = 50, skip = 0 } = req.query;
  if (!songId) throw new CustomError("SongId is Required", 400);
  const queryStr = `?limit=${limit}&skip=${skip}`;
  const { data } = await api.get(
    micorServiceEndpoint.songs.songsSuggestionById(songId as string) + queryStr
  );
  let formatedSongs: SongSchema[] = [];
  if (data.success) {
    const songs = data?.data;
    await getFormatedSong(songs, formatedSongs);
  }

  res.status(200).json(
    getFormatedResponse({
      message: "Song suggested successfully",
      data: formatedSongs,
    })
  );
};
