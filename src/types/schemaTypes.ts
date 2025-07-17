import { Document } from "mongoose";
export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  profileImage?: string;
  isAdmin?: boolean;
  token?: string;
}
export type SongSchema = {
  id: string;
  name: string;
  duration: string;
  artistImage: string;
  songImage: string;
  downloadUrl: {
    low: string;
    medium: string;
    high: string;
    veryHigh: string;
  }[];
  playCount: number;
  language: string;
};

export interface IGenres extends Document {
  name: string;
  totalSongs: number;
  songs: SongSchema;
  playlistIds: string[];
  isActive: boolean;
}
