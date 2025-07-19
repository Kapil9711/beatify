"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedGenreSongSchema = exports.genresSongsSchema = exports.genresSchema = exports.AlbumSchema = exports.ArtistSchema = exports.PlaylistSchema = exports.SongSchema = exports.loginUserSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    userName: zod_1.z.string().min(1, "Username is Required"),
    email: zod_1.z.string().email("Please enter a valid email address"),
    password: zod_1.z.string().min(8, "Password Should have at least 8 characters"),
    profileImage: zod_1.z.string().optional(),
});
exports.loginUserSchema = zod_1.z.object({
    email: zod_1.z.string().email("Please enter a valid email address"),
    password: zod_1.z.string().min(8, "Password Should have at least 8 characters"),
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
const DownloadUrlSchema = zod_1.z.object({
    low: zod_1.z.string().url(),
    medium: zod_1.z.string().url(),
    high: zod_1.z.string().url(),
    veryHigh: zod_1.z.string().url(),
});
exports.SongSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string().min(1),
    duration: zod_1.z.string(), // e.g. "3:45"
    artistImage: zod_1.z.string().url(),
    artistName: zod_1.z.string().min(1),
    songImage: zod_1.z.string().url(),
    downloadUrl: DownloadUrlSchema,
    playCount: zod_1.z.number().int().min(0).nullable().default(0),
    language: zod_1.z.string().min(1),
});
exports.PlaylistSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string().min(1),
    playlistImage: zod_1.z.string().url(),
    songCount: zod_1.z.number().int().min(0),
    language: zod_1.z.string().min(1),
});
exports.ArtistSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string().min(1),
    artistImage: zod_1.z.string().min(1),
    languages: zod_1.z.array(zod_1.z.string()).nullable().default([]),
});
exports.AlbumSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string().min(1),
    albumImage: zod_1.z.string().url(),
    artistName: zod_1.z.string().min(1),
    language: zod_1.z.string().min(1),
});
exports.genresSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    totalSongs: zod_1.z.number().int().min(0),
    songs: zod_1.z.array(exports.SongSchema),
    playlistIds: zod_1.z.array(zod_1.z.string()),
    isActive: zod_1.z.boolean(),
});
exports.genresSongsSchema = zod_1.z.object({
    type: zod_1.z.enum(["add", "remove"]),
    songs: zod_1.z.array(exports.SongSchema),
});
exports.seedGenreSongSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    limit: zod_1.z.number().optional(),
    skip: zod_1.z.number().optional(),
});
