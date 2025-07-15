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
 *     Genre:
 *       type: object
 *       required:
 *         - name
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
 *           description: Array of song references
 *           items:
 *             type: object
 *         playlistIds:
 *           type: array
 *           description: Array of playlist IDs
 *           items:
 *             type: string
 *             format: uuid
 *         isActive:
 *           type: boolean
 *           description: Whether the genre is active
 *           default: true
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
 *           items:
 *             $ref: '#/components/schemas/SongReference'
 *           description: Array of songs to add or remove
 *
 *     SongReference:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier of the song
 *           example: "song123"
 *         title:
 *           type: string
 *           description: Title of the song (optional for removal)
 *           example: "My Song Title"
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
 *           example: "Songs Added Successfully"
 *
 *     Genre:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: ObjectId
 *           example: "507f1f77bcf86cd799439011"
 *         songs:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SongReference'
 *         totalSongs:
 *           type: number
 *           example: 5
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Genre Not Found"
 *         error:
 *           type: string
 *           example: "Detailed error message"
 */
