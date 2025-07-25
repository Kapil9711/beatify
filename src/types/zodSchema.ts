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

// export const genresSchema = z.object({
//   name: z
//     .string()
//     .min(1, "Genre name is required")
//     .max(50, "Genre name cannot exceed 50 characters"),
//   totalSongs: z
//     .number()
//     .int()
//     .nonnegative()
//     .default(0)
//     .describe("Total songs in this genre"),
//   songs: z.array(z.any()).default([]).describe("Array of song references"),
//   playlistIds: z
//     .array(z.string().uuid())
//     .default([])
//     .describe("Array of playlist IDs containing this genre"),
//   isActive: z
//     .boolean()
//     .default(true)
//     .describe("Whether the genre is active/visible"),
// });

const DownloadUrlSchema = z.object({
  low: z.string().url(),
  medium: z.string().url(),
  high: z.string().url(),
  veryHigh: z.string().url(),
});

export const SongSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  duration: z.string(), // e.g. "3:45"
  artistImage: z.string().url(),
  artistName: z.string().min(1),
  songImage: z.string().url(),
  downloadUrl: DownloadUrlSchema,
  playCount: z.number().int().min(0).nullable().default(0),
  language: z.string().min(1),
});

export const PlaylistSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  playlistImage: z.string().url(),
  songCount: z.number().int().min(0),
  language: z.string().min(1),
});

export const ArtistSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  artistImage: z.string().min(1),
  languages: z.array(z.string()).nullable().default([]),
});

export const AlbumSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  albumImage: z.string().url(),
  artistName: z.string().min(1),
  language: z.string().min(1),
});

export const genresSchema = z.object({
  name: z.string().min(1),
  totalSongs: z.number().int().min(0),
  songs: z.array(SongSchema),
  playlistIds: z.array(z.string()),
  isActive: z.boolean(),
});

export const genresSongsSchema = z.object({
  type: z.enum(["add", "remove"]),
  songs: z.array(SongSchema),
});

export const seedGenreSongSchema = z.object({
  name: z.string().min(1),
  limit: z.number().optional(),
  skip: z.number().optional(),
});
