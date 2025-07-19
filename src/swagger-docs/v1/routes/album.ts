/**
 * @swagger
 * /api/v1/album:
 *   get:
 *     tags:
 *       - Albums
 *     summary: Search albums
 *     description: |
 *       Search for music albums based on a query string with pagination support.
 *       Returns formatted album data including tracks and metadata.
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search term for albums (album name, artist, etc.)
 *         example: "thriller"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *           minimum: 1
 *           maximum: 100
 *         description: Maximum number of albums to return
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           default: 0
 *           minimum: 0
 *         description: Number of albums to skip (for pagination)
 *     responses:
 *       200:
 *         description: Successfully retrieved albums
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
 *                   example: "Searched Album successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Album'
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
 *     Album:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "5f8d0d55b4f3c14f3c3a3b3c"
 *         name:
 *           type: string
 *           example: "Thriller"
 *         artist:
 *           type: string
 *           example: "Michael Jackson"
 *         year:
 *           type: integer
 *           example: 1982
 *         image:
 *           type: string
 *           example: "https://example.com/thriller.jpg"
 *         songs:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Song'
 *         totalTracks:
 *           type: integer
 *           example: 9
 *         genre:
 *           type: string
 *           example: "Pop"
 *     Song:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Billie Jean"
 *         id:
 *           type: string
 *           example: "5f8d0d55b4f3c14f3c3a3b3d"
 *         duration:
 *           type: string
 *           example: "294"
 *         trackNumber:
 *           type: integer
 *           example: 2
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
 * /api/v1/album/{albumId}:
 *   get:
 *     tags:
 *       - Albums
 *     summary: Get songs by album ID
 *     description: Retrieve all songs from a specific album using its unique identifier
 *     parameters:
 *       - in: path
 *         name: albumId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier of the album
 *         example: "5f8d0d55b4f3c14f3c3a3b3c"
 *     responses:
 *       200:
 *         description: Successfully retrieved album songs
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AlbumSongResponse'
 *       400:
 *         description: Bad request (missing or invalid albumId)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Album not found
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
 *     AlbumSongResponse:
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
 *             $ref: '#/components/schemas/Song'
 *     Song:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Billie Jean"
 *         id:
 *           type: string
 *           example: "5f8d0d55b4f3c14f3c3a3b3d"
 *         playCount:
 *           type: number
 *           example: 500000000
 *         duration:
 *           type: string
 *           example: "294"
 *         trackNumber:
 *           type: integer
 *           example: 2
 *         artistName:
 *           type: string
 *           example: "Michael Jackson"
 *         artistImage:
 *           type: string
 *           example: "https://example.com/mj.jpg"
 *         songImage:
 *           type: string
 *           example: "https://example.com/billie-jean.jpg"
 *         downloadUrl:
 *           $ref: '#/components/schemas/DownloadUrl'
 *     DownloadUrl:
 *       type: object
 *       properties:
 *         veryHigh:
 *           type: string
 *           example: "https://example.com/song_320kbps.mp3"
 *         high:
 *           type: string
 *           example: "https://example.com/song_160kbps.mp3"
 *         medium:
 *           type: string
 *           example: "https://example.com/song_96kbps.mp3"
 *         low:
 *           type: string
 *           example: "https://example.com/song_48kbps.mp3"
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Invalid albumId"
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
