import { Document } from "mongoose";
export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  profileImage?: string;
  isAdmin?: boolean;
  token?: string;
}

export interface IGenres extends Document {
  name: string;
  totalSongs: number;
  songs: any[];
  playlistIds: string[];
  isActive: boolean;
}
