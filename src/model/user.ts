import mongoose from "mongoose";
import { IUser } from "../types/schemaTypes";
import bcrypt from "bcrypt";

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
    select: false,
  },
  profileImage: {
    type: String,
    default: "",
  },
  isAdmin: {
    type: Boolean,
    default: false,
    select: false,
  },
});

// userSchema.index({ userName: 1 });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
