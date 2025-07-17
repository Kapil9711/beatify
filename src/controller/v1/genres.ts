import { Response } from "express";
import { ExtendedRequest } from "../../types/express/request";
import GenresModel from "../../model/genres";
import getFormatedResponse from "../../utlis/getFormatedResponse";
import CustomError from "../../middleware/customError";
import { isValidObjectId } from "mongoose";

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
  const { songs, name } = req.body;
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
