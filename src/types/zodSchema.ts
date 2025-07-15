import { z } from "zod";

export const userSchema = z.object({
  userName: z.string().min(1, "Username is Required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password Should have at least 8 characters"),
  profileImage: z.string().optional(),
});

export const loginUserSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password Should have at least 8 characters"),
});

export const genresSchema = z.object({
  name: z
    .string()
    .min(1, "Genre name is required")
    .max(50, "Genre name cannot exceed 50 characters"),
  totalSongs: z
    .number()
    .int()
    .nonnegative()
    .default(0)
    .describe("Total songs in this genre"),
  songs: z.array(z.any()).default([]).describe("Array of song references"),
  playlistIds: z
    .array(z.string().uuid())
    .default([])
    .describe("Array of playlist IDs containing this genre"),
  isActive: z
    .boolean()
    .default(true)
    .describe("Whether the genre is active/visible"),
});

export const genresSongSchema = z.object({
  type: z
    .enum(["add", "remove"])
    .describe("Operation type - must be either 'add' or 'remove'"),
  songs: z.array(z.any()).default([]).describe("Array of song references"),
});
