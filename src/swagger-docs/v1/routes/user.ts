/**
 * @swagger
 * /api/v1/user/all:
 *   get:
 *     summary: Get all users
 *     description: Returns a list of all users
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                      $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/v1/user:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - email
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: password123
 *               profileImage:
 *                 type: string
 *                 format: uri
 *                 example: https://example.com/image.png
 *     responses:
 *       200:
 *         description: User created successfully
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
 *                   example: Successfull
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                   example: []
 *       400:
 *         description: Validation error or bad request
 */

/**
 * @swagger
 * /api/v1/user/is-username-taken:
 *   get:
 *     summary: Check if a username is already taken
 *     tags:
 *       - User
 *     parameters:
 *       - in: query
 *         name: userName
 *         schema:
 *           type: string
 *         description: The username to check for availability
 *     responses:
 *       200:
 *         description: Status of the username (available or taken)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Username Already Taken
 *                 isSuccess:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Username is not provided in query params
 */

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: Log in a user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: strongPassword123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login Successfull
 *                 isSuccess:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     userName:
 *                       type: string
 *                       example: johndoe
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     profileImage:
 *                       type: string
 *                       example: https://cdn.example.com/profile.jpg
 *       400:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User Not Found
 *       401:
 *         description: Incorrect username or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Username or Password Incorrect
 */

/**
 * @swagger
 * /api/v1/user/{userId}:
 *   post:
 *     summary: Get user details by ID
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           example: 507f1f77bcf86cd799439011
 *         description: MongoDB ObjectId of the user
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User Found Successfully
 *                 isSuccess:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     userName:
 *                       type: string
 *                       example: johndoe
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     profileImage:
 *                       type: string
 *                       example: https://cdn.example.com/profile.jpg
 *                     id:
 *                       type: string
 *                       example: 507f1f77bcf86cd799439011
 *       400:
 *         description: Invalid user ID or user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid User Id or User Not Found
 *                 isSuccess:
 *                   type: boolean
 *                   example: false
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized access
 *                 isSuccess:
 *                   type: boolean
 *                   example: false
 */

/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: Get current authenticated user details
 *     description: Returns the details of the currently logged-in user
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User Found Successfully
 *                 isSuccess:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     userName:
 *                       type: string
 *                       example: johndoe
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     profileImage:
 *                       type: string
 *                       example: https://cdn.example.com/profile.jpg
 *                     id:
 *                       type: string
 *                       example: 507f1f77bcf86cd799439011
 *       400:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User Not Found
 *                 isSuccess:
 *                   type: boolean
 *                   example: false
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized access
 *                 isSuccess:
 *                   type: boolean
 *                   example: false
 */
