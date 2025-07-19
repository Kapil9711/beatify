import { Response } from "express";
import { ExtendedRequest } from "../../types/express/request";
import GenresModel from "../../model/genres";
import getFormatedResponse from "../../utlis/getFormatedResponse";
import CustomError from "../../middleware/customError";
import { isValidObjectId } from "mongoose";
import axios from "axios";
import {
  api,
  apiBaseUrl,
  micorServiceEndpoint,
} from "../../microServices/apiEndpoint";
import { SongSchema } from "../../types/zodSchema";
import { getFormatedSong } from "../../utlis/songHelper";

//getGenresList => /api/v1/genres/list
export const getGenresList = async (req: ExtendedRequest, res: Response) => {
  const { type = "more" } = req.query;

  let genres = [];
  if (type == "more") {
    genres = await GenresModel.find({ isActive: true });
  }

  if (type == "less") {
    genres = await GenresModel.find({ isActive: true }).select(
      "name totalSongs"
    );
  }

  res.status(200).json(
    getFormatedResponse({
      isSuccess: true,
      message: "Genres Fetched SuccessFully",
      data: genres,
    })
  );
};

//createGenres=>/api/v1/genres
export const createGenres = async (req: ExtendedRequest, res: Response) => {
  let { songs, name } = req.body;
  name = String(name).toLowerCase();
  const isExist = await GenresModel.findOne({ name });
  if (isExist) throw new CustomError("Genres already exists", 400);
  const genres = await GenresModel.create({
    ...req.body,
    totalSongs: songs.length,
  });
  res.status(201).json(
    getFormatedResponse({
      isSuccess: true,
      data: genres,
      message: "Genres created successfully",
    })
  );
};

//addRemoveSongInGenreByGenreId =>/api/v1/genres/add-remove-song/genreId
export const addRemoveSong = async (req: ExtendedRequest, res: Response) => {
  const { genreId } = req.params;
  let { songs, type } = req.body;
  if (!isValidObjectId(genreId)) throw new CustomError("Invalid GenreId", 400);
  const isExist: any = await GenresModel.findById(genreId).select("songs.id");
  if (!isExist) throw new CustomError("Genre Not Found", 400);

  let updatedGenre: any = null;
  if (type == "add") {
    songs = songs.filter(
      (song: any) => !isExist?.songs?.some((item: any) => item?.id == song.id)
    );
    updatedGenre = await GenresModel.findByIdAndUpdate(
      genreId,
      {
        $push: { songs: { $each: songs } },
      },
      { new: true }
    );
  }
  if (type == "remove") {
    const songsId = songs.map((song: any) => song.id);
    updatedGenre = await GenresModel.findByIdAndUpdate(
      genreId,
      {
        $pull: {
          songs: {
            id: { $in: songsId },
          },
        },
      },
      { new: true }
    );
  }

  if (!updatedGenre) throw new CustomError("Songs not updated", 400);

  const updateGenreWithLength = await GenresModel.findByIdAndUpdate(
    genreId,
    {
      $set: { totalSongs: updatedGenre?.songs?.length },
    },
    { new: true }
  );
  return res.status(201).json(
    getFormatedResponse({
      isSuccess: true,
      data: updateGenreWithLength,
      message:
        type == "add"
          ? "Songs Added Successfully"
          : "Songs Removed Successfully ",
    })
  );
};

//seedSong =>/api/v1/genres/seed-song
export const seedGenreSong = async (req: ExtendedRequest, res: Response) => {
  let { name } = req.body;
  name = String(name).toLowerCase();
  let language = ["hindi", "punjabi"];

  const allPlaylistId: string[] = [];

  for (let item of language) {
    let query = name + " " + item;
    try {
      const { data } = await api.get(
        micorServiceEndpoint.playlist.searchPlaylist + `?query=${query}`
      );
      if (data.success) {
        const playlists = data?.data?.results;
        if (Array.isArray(playlists)) {
          for (let playlist of playlists) {
            let { id, name: playlistName } = playlist;
            if (id && playlistName) {
              if (playlistName.toLowerCase().includes(name)) {
                allPlaylistId.push(id);
              }
            }
          }
        }
      }
    } catch (error) {}
  }

  let songsFromPlaylist: any = [];

  for (let id of allPlaylistId) {
    try {
      const { data } = await api.get(
        micorServiceEndpoint.playlist.searchPlaylistById + `?id=${id}`
      );
      if (data.success) {
        const songs = data?.data?.songs;
        await getFormatedSong(songs, songsFromPlaylist);
      }
    } catch (error) {}
  }

  console.log("Total songs from Playlist", songsFromPlaylist.length);
  let isExist: any = null;
  isExist = await GenresModel.findOne({ name: name }).select("name");
  if (!isExist) {
    console.log("Genre not Exist, creating new Genre");
    isExist = await GenresModel.create({ name });
  }

  const genreList = await GenresModel.find({})
    .select("name -_id songs.id")
    .lean();

  if (genreList.length === 0)
    throw new CustomError("No genre found in DB", 400);

  let formatedGenreData: any = {};

  for (let genre of genreList) {
    const { name, songs }: any = genre;
    for (let song of songs) {
      const { id } = song;
      if (formatedGenreData[name]) {
        formatedGenreData[name][id] = true;
      } else {
        formatedGenreData[name] = { [id]: true };
      }
    }
  }

  let songsAfterRemoveDubplicate: any = [];
  if (Object.keys(formatedGenreData).length > 0) {
    for (let song of songsFromPlaylist) {
      const { id } = song;
      let flag = false;
      if (id) {
        for (let key in formatedGenreData) {
          const value = formatedGenreData[key];
          if (value[id]) flag = true;
        }
      }
      if (!flag) {
        songsAfterRemoveDubplicate.push(song);
      }
    }
  } else {
    songsAfterRemoveDubplicate = songsFromPlaylist;
  }

  req.params = { genreId: isExist.id as string };
  req.body = { type: "add", songs: songsAfterRemoveDubplicate };
  console.log("filtered Songs Length", songsAfterRemoveDubplicate.length);
  await addRemoveSong(req, res);
};
