"use strict";
/**
 * @swagger
 * /api/v1/artist:
 *   get:
 *     tags:
 *       - Artists
 *     summary: Search artists
 *     description: Search for music artists with pagination support
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Artist name or related search term
 *         example: "weeknd"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *           minimum: 1
 *           maximum: 100
 *         description: Maximum number of results to return
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           default: 0
 *           minimum: 0
 *         description: Number of results to skip
 *     responses:
 *       200:
 *         description: Successful artist search
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArtistResponse'
 *       400:
 *         description: Missing search query
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
 *     ArtistResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Searched Artist successfully"
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Artist'
 *     Artist:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "5f8d0d55b4f3c14f3c3a3b3c"
 *         name:
 *           type: string
 *           example: "The Weeknd"
 *         image:
 *           type: string
 *           example: "https://example.com/weeknd.jpg"
 *         followers:
 *           type: integer
 *           example: 50000000
 *         genres:
 *           type: array
 *           items:
 *             type: string
 *           example: ["R&B", "pop"]
 *         popularity:
 *           type: integer
 *           example: 95
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
 */
/**
 * @swagger
 * /api/v1/artist/{artistId}:
 *   get:
 *     tags:
 *       - Artists
 *     summary: Get songs by artist ID
 *     description: Retrieve paginated songs for a specific artist with optional language filtering
 *     parameters:
 *       - in: path
 *         name: artistId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier of the artist
 *         example: "1274170"  # Example: The Weeknd's artist ID
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *           minimum: 1
 *           maximum: 100
 *         description: Number of songs to return per page
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           default: 0
 *           minimum: 0
 *         description: Number of songs to skip (for pagination)
 *       - in: query
 *         name: language
 *         schema:
 *           type: string
 *         description: Filter songs by language (e.g. "english", "hindi")
 *         example: "english"
 *     responses:
 *       200:
 *         description: Successfully retrieved artist songs
 *         content:
 *           application/json:
 *             schema:

 *       400:
 *         description: Invalid artist ID
 *         content:
 *           application/json:
 *             schema:

 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:

 *     security:
 *       - bearerAuth: []
 *
 * components:
 *   schemas:
 *     ArtistSongsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Searched song successfully"
 *         data:
 *           type: array
 *           items:

 *     ArtistSong:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "123456789"
 *         title:
 *           type: string
 *           example: "Blinding Lights"
 *         duration:
 *           type: string
 *           example: "203"
 *         playCount:
 *           type: integer
 *           example: 1500000000
 *         language:
 *           type: string
 *           example: "english"
 *         downloadUrl:

 *         artist:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: "1274170"
 *             name:
 *               type: string
 *               example: "The Weeknd"
 *     DownloadUrls:
 *       type: object
 *       properties:
 *         high:
 *           type: string
 *           example: "https://example.com/song_320kbps.mp3"
 *         medium:
 *           type: string
 *           example: "https://example.com/song_128kbps.mp3"
 *         low:
 *           type: string
 *           example: "https://example.com/song_64kbps.mp3"
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Invalid artist ID"
 *         error:
 *           type: object
 *           properties:
 *             code:
 *               type: integer
 *               example: 400
 */
