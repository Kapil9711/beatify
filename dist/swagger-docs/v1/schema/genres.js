"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     DownloadUrl:
 *       type: object
 *       required:
 *         - low
 *         - medium
 *         - high
 *         - veryHigh
 *       properties:
 *         low:
 *           type: string
 *           format: uri
 *           description: Low quality download URL
 *           example: "https://example.com/songs/123/low.mp3"
 *         medium:
 *           type: string
 *           format: uri
 *           description: Medium quality download URL
 *           example: "https://example.com/songs/123/medium.mp3"
 *         high:
 *           type: string
 *           format: uri
 *           description: High quality download URL
 *           example: "https://example.com/songs/123/high.mp3"
 *         veryHigh:
 *           type: string
 *           format: uri
 *           description: Very high quality download URL
 *           example: "https://example.com/songs/123/very-high.mp3"
 *
 *     Song:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - duration
 *         - artistImage
 *         - songImage
 *         - downloadUrl
 *         - playCount
 *         - language
 *       properties:
 *         id:
 *           type: string
 *           description: Unique song identifier
 *           example: "507f1f77bcf86cd799439011"
 *         name:
 *           type: string
 *           description: Name of the song
 *           example: "Bohemian Rhapsody"
 *           minLength: 1
 *           maxLength: 100
 *         duration:
 *           type: string
 *           pattern: '^[0-9]+:[0-9]{2}$'
 *           description: Duration in MM:SS format
 *           example: "5:55"
 *         artistImage:
 *           type: string
 *           format: uri
 *           description: URL of artist image
 *           example: "https://example.com/artists/queen.jpg"
 *         songImage:
 *           type: string
 *           format: uri
 *           description: URL of song cover image
 *           example: "https://example.com/covers/bohemian-rhapsody.jpg"
 *         downloadUrl:
 *           type: array
 *           minItems: 1
 *           items:
 *             $ref: '#/components/schemas/DownloadUrl'
 *         playCount:
 *           type: integer
 *           minimum: 0
 *           description: Number of times the song has been played
 *           example: 1000000
 *           default: 0
 *         language:
 *           type: string
 *           description: Language of the song
 *           example: "English"
 *           minLength: 2
 *           maxLength: 20
 *
 *     Genre:
 *       type: object
 *       required:
 *         - name
 *         - totalSongs
 *         - songs
 *         - playlistIds
 *         - isActive
 *       properties:
 *         name:
 *           type: string
 *           description: Unique name of the genre
 *           example: "Rock"
 *           minLength: 1
 *           maxLength: 50
 *         totalSongs:
 *           type: integer
 *           description: Total number of songs in this genre
 *           example: 42
 *           minimum: 0
 *           default: 0
 *         songs:
 *           type: array
 *           description: Array of song objects
 *           items:
 *             $ref: '#/components/schemas/Song'
 *         playlistIds:
 *           type: array
 *           description: Array of playlist IDs containing this genre
 *           items:
 *             type: string
 *             format: uuid
 *             example: "507f1f77bcf86cd799439011"
 *         isActive:
 *           type: boolean
 *           description: Whether the genre is active/visible
 *           default: true
 *           example: true
 *       example:
 *         name: "Rock"
 *         totalSongs: 42
 *         songs:
 *           - id: "507f1f77bcf86cd799439011"
 *             name: "Bohemian Rhapsody"
 *             duration: "5:55"
 *             artistImage: "https://example.com/artists/queen.jpg"
 *             songImage: "https://example.com/covers/bohemian-rhapsody.jpg"
 *             downloadUrl:
 *               - low: "https://example.com/songs/123/low.mp3"
 *                 medium: "https://example.com/songs/123/medium.mp3"
 *                 high: "https://example.com/songs/123/high.mp3"
 *                 veryHigh: "https://example.com/songs/123/very-high.mp3"
 *             playCount: 1000000
 *             language: "English"
 *         playlistIds: ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"]
 *         isActive: true
 */
