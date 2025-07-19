"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - userName
 *         - email
 *         - password
 *
 *       properties:
 *         userName:
 *           type: string
 *           description: The user's username
 *           example: johndoe
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address
 *           example: johndoe@example.com
 *         password:
 *           type: string
 *           description: The user's hashed password
 *           example: "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36bF/5Qa7VdFg1HMQ2Mx5a."
 *         profileImage:
 *           type: string
 *           format: uri
 *           description: URL to the user's profile image
 *           example: "https://example.com/images/johndoe.jpg"
 *         isAdmin:
 *           type: boolean
 *           description: Whether the user has admin privileges
 *           example: false
 */
