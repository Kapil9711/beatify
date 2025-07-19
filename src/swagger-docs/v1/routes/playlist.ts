/**
 * @swagger
 * /api/v1/playlist:
 *   get:
 *     tags:
 *       - Playlists
 *     summary: Search playlists
 *     description: |
 *       Search for playlists based on a query string with pagination support.
 *       Returns formatted playlist data including songs and metadata.
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search term for playlists (name, description, etc.)
 *         example: "workout music"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *           minimum: 1
 *           maximum: 100
 *         description: Maximum number of playlists to return
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           default: 0
 *           minimum: 0
 *         description: Number of playlists to skip (for pagination)
 *     responses:
 *       200:
 *         description: Successfully retrieved playlists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Searched Playlist successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Playlist'
 *       400:
 *         description: Bad request (missing query parameter)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *     security:
 *       - bearerAuth: []
 *
 * components:
 *   schemas:
 *     Playlist:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "5f8d0d55b4f3c14f3c3a3b3c"
 *         name:
 *           type: string
 *           example: "Workout Mix 2023"
 *         description:
 *           type: string
 *           example: "High energy tracks for your workout session"
 *         image:
 *           type: string
 *           example: "https://example.com/playlist-image.jpg"
 *         songs:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Song'
 *         totalSongs:
 *           type: integer
 *           example: 25
 *         followers:
 *           type: integer
 *           example: 1500
 *         createdBy:
 *           type: string
 *           example: "Music Curator"
 *     Song:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Eye of the Tiger"
 *         id:
 *           type: string
 *           example: "5f8d0d55b4f3c14f3c3a3b3d"
 *         duration:
 *           type: string
 *           example: "245"
 *         artistName:
 *           type: string
 *           example: "Survivor"
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Search query is Required"
 *         error:
 *           type: object
 *           properties:
 *             code:
 *               type: integer
 *               example: 400
 *             details:
 *               type: string
 *               example: "Validation error details"
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/v1/playlist/{playlistId}:
 *   get:
 *     tags:
 *       - Playlists
 *     summary: Get songs by playlist ID
 *     description: Retrieve all songs from a specific playlist with pagination support
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier of the playlist
 *         example: "5f8d0d55b4f3c14f3c3a3b3c"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *           minimum: 1
 *           maximum: 100
 *         description: Maximum number of songs to return
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           default: 0
 *           minimum: 0
 *         description: Number of songs to skip (for pagination)
 *     responses:
 *       200:
 *         description: Successfully retrieved playlist songs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Searched song successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Song'
 *       400:
 *         description: Bad request (missing or invalid playlistId)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Playlist not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *     security:
 *       - bearerAuth: []
 *
 * components:
 *   schemas:
 *     Song:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Blinding Lights"
 *         id:
 *           type: string
 *           example: "5f8d0d55b4f3c14f3c3a3b3d"
 *         playCount:
 *           type: number
 *           example: 1200000000
 *         language:
 *           type: string
 *           example: "english"
 *         duration:
 *           type: string
 *           example: "203"
 *         artistImage:
 *           type: string
 *           example: "https://example.com/weeknd.jpg"
 *         artistName:
 *           type: string
 *           example: "The Weeknd"
 *         songImage:
 *           type: string
 *           example: "https://example.com/blinding-lights.jpg"
 *         downloadUrl:
 *           type: object
 *           properties:
 *             veryHigh:
 *               type: string
 *               example: "https://example.com/song_320kbps.mp3"
 *             high:
 *               type: string
 *               example: "https://example.com/song_160kbps.mp3"
 *             medium:
 *               type: string
 *               example: "https://example.com/song_96kbps.mp3"
 *             low:
 *               type: string
 *               example: "https://example.com/song_48kbps.mp3"
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Invalid playlistId"
 *         error:
 *           type: object
 *           properties:
 *             code:
 *               type: integer
 *               example: 400
 *             details:
 *               type: string
 *               example: "Validation error details"
 */
