/**
 * @swagger
 * components:
 *   schemas:
 *     Genre:
 *       type: object
 *       required:
 *         - name
 *         - totalSongs
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
 *           description: Array of song objects/references
 *           items:
 *             type: object
 *             additionalProperties: true
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
 *         name: "Pop"
 *         totalSongs: 35
 *         songs: []
 *         playlistIds: ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"]
 *         isActive: true
 */
