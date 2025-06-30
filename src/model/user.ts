import mongoose from "mongoose";
import { IUser } from "../types/schemaTypes";

const userSchema = new mongoose.Schema<IUser>({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
    maxlength: [16, "Password must be less then 16 characters"],
  },
  profileImage: {
    type: String,
    default: "",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// userSchema.index({ userName: 1 });

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
