/**
 * @swagger
 * tags:
 *   - name: Genres
 *     description: Music genres management
 */

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
 *           description: Low quality audio URL
 *           example: "https://cdn.example.com/songs/123/low.mp3"
 *         medium:
 *           type: string
 *           format: uri
 *           description: Medium quality audio URL
 *           example: "https://cdn.example.com/songs/123/medium.mp3"
 *         high:
 *           type: string
 *           format: uri
 *           description: High quality audio URL
 *           example: "https://cdn.example.com/songs/123/high.mp3"
 *         veryHigh:
 *           type: string
 *           format: uri
 *           description: Very high quality audio URL
 *           example: "https://cdn.example.com/songs/123/lossless.flac"
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
 *           format: uuid
 *           description: Unique song identifier
 *           example: "507f1f77bcf86cd799439011"
 *         name:
 *           type: string
 *           description: Song title
 *           minLength: 1
 *           maxLength: 100
 *           example: "Bohemian Rhapsody"
 *         duration:
 *           type: string
 *           pattern: '^\d+:\d{2}$'
 *           description: Duration in MM:SS format
 *           example: "5:55"
 *         artistImage:
 *           type: string
 *           format: uri
 *           description: URL to artist image
 *           example: "https://cdn.example.com/artists/queen.jpg"
 *         songImage:
 *           type: string
 *           format: uri
 *           description: URL to song cover art
 *           example: "https://cdn.example.com/covers/bohemian-rhapsody.jpg"
 *         downloadUrl:
 *           type: array
 *           minItems: 1
 *           items:
 *             $ref: '#/components/schemas/DownloadUrl'
 *           description: Available download quality options
 *         playCount:
 *           type: integer
 *           minimum: 0
 *           description: Total play counts
 *           example: 1245678
 *           default: 0
 *         language:
 *           type: string
 *           minLength: 2
 *           maxLength: 20
 *           description: Song language
 *           example: "English"
 *
 *     Genre:
 *       type: object
 *       required:
 *         - name
 *         - songs
 *       properties:
 *         name:
 *           type: string
 *           description: Genre name
 *           minLength: 1
 *           maxLength: 50
 *           example: "Rock"
 *         totalSongs:
 *           type: integer
 *           minimum: 0
 *           description: Count of songs in this genre
 *           example: 42
 *           default: 0
 *         songs:
 *           type: array
 *           description: Songs in this genre
 *           items:
 *             $ref: '#/components/schemas/Song'
 *         playlistIds:
 *           type: array
 *           description: Playlists containing this genre
 *           items:
 *             type: string
 *             format: uuid
 *             example: "507f1f77bcf86cd799439011"
 *         isActive:
 *           type: boolean
 *           description: Active status
 *           default: true
 *           example: true
 *       example:
 *         name: "Rock"
 *         totalSongs: 42
 *         songs:
 *           - id: "507f1f77bcf86cd799439011"
 *             name: "Bohemian Rhapsody"
 *             duration: "5:55"
 *             artistImage: "https://cdn.example.com/artists/queen.jpg"
 *             songImage: "https://cdn.example.com/covers/bohemian-rhapsody.jpg"
 *             downloadUrl:
 *               - low: "https://cdn.example.com/songs/123/low.mp3"
 *                 medium: "https://cdn.example.com/songs/123/medium.mp3"
 *                 high: "https://cdn.example.com/songs/123/high.mp3"
 *                 veryHigh: "https://cdn.example.com/songs/123/lossless.flac"
 *             playCount: 1245678
 *             language: "English"
 *         playlistIds: ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"]
 *         isActive: true
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Internal server error"
 *         error:
 *           type: string
 *           example: "Error details"
 */

/**
 * @swagger
 * /api/v1/genres/list:
 *   get:
 *     tags: [Genres]
 *     summary: Get active genres
 *     description: Returns list of active genres with name and song count
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Genres fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Genre'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   components:
 *     schemas:
 *       GenreBasic:
 *         type: object
 *         properties:
 *           name:
 *             type: string
 *             example: "Rock"
 *           totalSongs:
 *             type: integer
 *             example: 42
 */

/**
 * @swagger
 * /api/v1/genres:
 *   post:
 *     tags: [Genres]
 *     summary: Create new genre
 *     description: Create a new music genre entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Genre'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Genre created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Genre'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Validation failed"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       path:
 *                         type: string
 *                         example: "name"
 *                       message:
 *                         type: string
 *                         example: "Genre name is required"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/v1/genres/add-remove-song/{genreId}:
 *   post:
 *     tags: [Genres]
 *     summary: Add or remove songs from a genre
 *     description: |
 *       Adds or removes songs from a specific genre based on the operation type.
 *       - For 'add': Only adds songs that don't already exist in the genre
 *       - For 'remove': Removes all songs that match the provided IDs
 *     parameters:
 *       - in: path
 *         name: genreId
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *         description: ID of the genre to modify
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GenreSongOperation'
 *     responses:
 *       201:
 *         description: Successfully updated genre songs
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FormattedResponse'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Genre not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     GenreSongOperation:
 *       type: object
 *       required:
 *         - type
 *         - songs
 *       properties:
 *         type:
 *           type: string
 *           enum: [add, remove]
 *           description: Operation type (add or remove songs)
 *           example: "add"
 *         songs:
 *           type: array
 *           minItems: 1
 *           description: Array of songs to add or remove
 *           items:
 *             oneOf:
 *               - $ref: '#/components/schemas/Song'  # For add operations
 *               - $ref: '#/components/schemas/SongReference'  # For remove operations
 *
 *     SongReference:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier of the song
 *           example: "611f1f77bcf86cd799439022"
 *         title:
 *           type: string
 *           description: Title of the song (optional for removal)
 *           example: "Bohemian Rhapsody"
 *           minLength: 1
 *           maxLength: 100
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
 *           format: uuid
 *           example: "611f1f77bcf86cd799439022"
 *         name:
 *           type: string
 *           example: "Bohemian Rhapsody"
 *           minLength: 1
 *           maxLength: 100
 *         duration:
 *           type: string
 *           pattern: '^\d+:\d{2}$'
 *           example: "5:55"
 *         artistImage:
 *           type: string
 *           format: uri
 *           example: "https://cdn.example.com/artists/queen.jpg"
 *         songImage:
 *           type: string
 *           format: uri
 *           example: "https://cdn.example.com/covers/bohemian-rhapsody.jpg"
 *         downloadUrl:
 *           type: array
 *           minItems: 1
 *           items:
 *             $ref: '#/components/schemas/DownloadUrl'
 *         playCount:
 *           type: integer
 *           minimum: 0
 *           example: 1245678
 *         language:
 *           type: string
 *           minLength: 2
 *           maxLength: 20
 *           example: "English"
 *
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
 *           example: "https://cdn.example.com/songs/123/low.mp3"
 *         medium:
 *           type: string
 *           format: uri
 *           example: "https://cdn.example.com/songs/123/medium.mp3"
 *         high:
 *           type: string
 *           format: uri
 *           example: "https://cdn.example.com/songs/123/high.mp3"
 *         veryHigh:
 *           type: string
 *           format: uri
 *           example: "https://cdn.example.com/songs/123/lossless.flac"
 *
 *     FormattedResponse:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *           example: true
 *         data:
 *           $ref: '#/components/schemas/Genre'
 *         message:
 *           type: string
 *           example: "Songs added successfully"
 *         metadata:
 *           type: object
 *           properties:
 *             addedCount:
 *               type: integer
 *               example: 3
 *             removedCount:
 *               type: integer
 *               example: 0
 *             duplicatesSkipped:
 *               type: integer
 *               example: 2
 *
 *     Genre:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: ObjectId
 *           example: "507f1f77bcf86cd799439011"
 *         name:
 *           type: string
 *           example: "Rock"
 *         songs:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Song'
 *         totalSongs:
 *           type: integer
 *           example: 15
 *         playlistIds:
 *           type: array
 *           items:
 *             type: string
 *             format: ObjectId
 *           example: ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013"]
 *         isActive:
 *           type: boolean
 *           example: true
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Genre not found"
 *         error:
 *           type: string
 *           example: "NotFoundError"
 *         validationErrors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *                 example: "duration"
 *               message:
 *                 type: string
 *                 example: "Must match format MM:SS"
 */
