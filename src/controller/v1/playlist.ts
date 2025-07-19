import { Response } from "express";
import { api, micorServiceEndpoint } from "../../microServices/apiEndpoint";
import { ExtendedRequest } from "../../types/express/request";
import { SongSchema } from "../../types/schemaTypes";
import getFormatedResponse from "../../utlis/getFormatedResponse";
import { getFormatedPlaylist, getFormatedSong } from "../../utlis/songHelper";
import CustomError from "../../middleware/customError";
import { isValidObjectId } from "mongoose";

//getSearchPlaylist =>api/v1/playlist
export const getSearchedPlaylist = async (
  req: ExtendedRequest,
  res: Response
) => {
  const { query, limit = 50, skip = 0 } = req.query;
  if (!query) throw new CustomError("Search query is Required", 400);
  const queryStr = `?query=${query}&limit=${limit}&skip=${skip}`;
  const { data } = await api.get(
    micorServiceEndpoint.playlist.searchPlaylist + queryStr
  );
  let formatedPlaylist: any[] = [];
  if (data.success) {
    const playlists = data?.data?.results;
    await getFormatedPlaylist(playlists, formatedPlaylist);
  }

  res.status(200).json(
    getFormatedResponse({
      message: "Searched Playlist successfully",
      data: formatedPlaylist,
    })
  );
};

//getSongByPlaylistId =>api/v1/playlist/:playlistId
export const getPlaylistSongById = async (
  req: ExtendedRequest,
  res: Response
) => {
  const { playlistId } = req.params;
  const { limit = 50, skip = 0 } = req.query;
  if (!playlistId) throw new CustomError("Invalid SongId", 400);
  const { data } = await api.get(
    micorServiceEndpoint.playlist.searchPlaylistById +
      `?id=${playlistId}&limit=${limit}&skip=${skip}`
  );
  let formatedSongs: SongSchema[] = [];
  if (data.success) {
    const songs = data?.data?.songs;
    await getFormatedSong(songs, formatedSongs);
  }

  res.status(200).json(
    getFormatedResponse({
      message: "Searched song successfully",
      data: formatedSongs,
    })
  );
};
