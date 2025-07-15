import mongoose from "mongoose";
import { IGenres, IUser } from "../types/schemaTypes";

const genresSchema = new mongoose.Schema<IGenres>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  totalSongs: {
    type: Number,
    required: true,
    default: 0,
  },
  songs: {
    type: [{}],
  },
  playlistIds: {
    type: [String],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

// userSchema.index({ userName: 1 });

const GenresModel = mongoose.model<IGenres>("Genres", genresSchema);

export default GenresModel;
