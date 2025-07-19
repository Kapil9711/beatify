import { Response } from "express";
import { api, micorServiceEndpoint } from "../../microServices/apiEndpoint";
import { ExtendedRequest } from "../../types/express/request";
import { SongSchema } from "../../types/schemaTypes";
import getFormatedResponse from "../../utlis/getFormatedResponse";
import { getFormatedAlbum, getFormatedSong } from "../../utlis/songHelper";
import CustomError from "../../middleware/customError";

//getSearchAlbum =>api/v1/album
export const getSearchedAlbum = async (req: ExtendedRequest, res: Response) => {
  const { query, limit = 50, skip = 0 } = req.query;
  if (!query) throw new CustomError("Search query is Required", 400);
  const queryStr = `?query=${query}&limit=${limit}&skip=${skip}`;
  const { data } = await api.get(
    micorServiceEndpoint.album.searchAlbum + queryStr
  );
  let formatedAlbum: any[] = [];
  if (data.success) {
    const albums = data?.data?.results;
    await getFormatedAlbum(albums, formatedAlbum);
  }

  res.status(200).json(
    getFormatedResponse({
      message: "Searched Alumb successfully",
      data: formatedAlbum,
    })
  );
};

//getSongByAlbumId =>api/v1/album/:albumId
export const getAlbumSongById = async (req: ExtendedRequest, res: Response) => {
  const { albumId } = req.params;
  if (!albumId) throw new CustomError("Invalid SongId", 400);
  const { data } = await api.get(
    micorServiceEndpoint.album.searchAlbumById + `?id=${albumId}`
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
