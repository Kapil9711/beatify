/**
 * @swagger
 * /api/v1/song:
 *   get:
 *     tags:
 *       - Songs
 *     summary: Search for songs
 *     description: |
 *       Search for songs based on a query string with pagination support.
 *       Returns formatted song data including artist information and download URLs.
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search term for songs (song name, artist, etc.)
 *         example: "shape of you"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *         description: Maximum number of results to return
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of results to skip (for pagination)
 *     responses:
 *       200:
 *         description: Successful song search
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
 *     Song:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Shape of You"
 *         id:
 *           type: string
 *           example: "123456"
 *         playCount:
 *           type: number
 *           example: 1000000
 *         language:
 *           type: string
 *           example: "english"
 *         duration:
 *           type: string
 *           example: "233"
 *         artistImage:
 *           type: string
 *           example: "https://example.com/artist.jpg"
 *         artistName:
 *           type: string
 *           example: "Ed Sheeran"
 *         songImage:
 *           type: string
 *           example: "https://example.com/song.jpg"
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
 *           example: "Error message"
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

/**
 * @swagger
 * /api/v1/song/{songId}:
 *   get:
 *     tags:
 *       - Songs
 *     summary: Get song by ID
 *     description: Retrieve detailed information about a specific song using its unique ID
 *     parameters:
 *       - in: path
 *         name: songId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier of the song
 *         example: "1234567890abcdef"
 *     responses:
 *       200:
 *         description: Successfully retrieved song details
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
 *                   $ref: '#/components/schemas/Song'
 *       400:
 *         description: Invalid song ID provided
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Song not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Song not found"
 *                 data:
 *                   type: null
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
 *           example: "Bohemian Rhapsody"
 *         id:
 *           type: string
 *           example: "1234567890abcdef"
 *         playCount:
 *           type: number
 *           example: 150000000
 *         language:
 *           type: string
 *           example: "english"
 *         duration:
 *           type: string
 *           example: "354"
 *         artistImage:
 *           type: string
 *           example: "https://example.com/queen.jpg"
 *         artistName:
 *           type: string
 *           example: "Queen"
 *         songImage:
 *           type: string
 *           example: "https://example.com/bohemian-rhapsody.jpg"
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
 *           example: "Error message"
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

/**
 * @swagger
 * /api/v1/song/suggestion:
 *   get:
 *     tags:
 *       - Songs
 *     summary: Get song suggestions
 *     description: |
 *       Get recommended songs based on a specific song ID.
 *       Returns a list of formatted song suggestions with pagination support.
 *     parameters:
 *       - in: query
 *         name: songId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the song to get suggestions for
 *         example: "5f8d0d55b4f3c14f3c3a3b3c"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *           minimum: 1
 *           maximum: 100
 *         description: Maximum number of suggestions to return
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           default: 0
 *           minimum: 0
 *         description: Number of suggestions to skip (for pagination)
 *     responses:
 *       200:
 *         description: Successfully retrieved song suggestions
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
 *                   example: "Song suggested successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Song'
 *       400:
 *         description: Bad request (missing songId parameter)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Song not found
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
 *           example: "Dancing Queen"
 *         id:
 *           type: string
 *           example: "5f8d0d55b4f3c14f3c3a3b3d"
 *         playCount:
 *           type: number
 *           example: 85000000
 *         language:
 *           type: string
 *           example: "english"
 *         duration:
 *           type: string
 *           example: "231"
 *         artistImage:
 *           type: string
 *           example: "https://example.com/abba.jpg"
 *         artistName:
 *           type: string
 *           example: "ABBA"
 *         songImage:
 *           type: string
 *           example: "https://example.com/dancing-queen.jpg"
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
 *           example: "SongId is Required"
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
