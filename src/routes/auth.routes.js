/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: Muskan Chauhan
 *               email:
 *                 type: string
 *                 example: Muskan@test.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               role:
 *                 type: string
 *                 example: ADMIN
 *     responses:
 *       201:
 *         description: User registered successfully
 */


/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
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
 *                 example: Muskan@test.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */


/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update user role and status (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 example: ANALYST
 *               status:
 *                 type: string
 *                 example: ACTIVE
 *     responses:
 *       200:
 *         description: User updated successfully
 */


/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current logged-in user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user details
 */


/**
 * @swagger
 * /records:
 *   post:
 *     summary: Create a financial record (Admin & Analyst)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - type
 *               - category
 *               - date
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 5000
 *               type:
 *                 type: string
 *                 example: INCOME
 *               category:
 *                 type: string
 *                 example: Salary
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-04-03
 *               notes:
 *                 type: string
 *                 example: Monthly salary
 *     responses:
 *       201:
 *         description: Record created successfully
 */


/**
 * @swagger
 * /records:
 *   get:
 *     summary: Get all records with optional filters
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by type (INCOME / EXPENSE)
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date filter
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date filter
 *     responses:
 *       200:
 *         description: List of records
 */


/**
 * @swagger
 * /records/{id}:
 *   patch:
 *     summary: Update a record (Admin only)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Record ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Record updated successfully
 */

/**
 * @swagger
 * /records/{id}:
 *   delete:
 *     summary: Delete a record (Admin only)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Record ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Record deleted successfully
 */

/**
 * @swagger
 * /records/all:
 *   get:
 *     summary: Get all financial records (Admin & Analyst)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched all records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   amount:
 *                     type: number
 *                     example: 5000
 *                   type:
 *                     type: string
 *                     example: INCOME
 *                   category:
 *                     type: string
 *                     example: Salary
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: 2026-04-03T00:00:00.000Z
 *                   notes:
 *                     type: string
 *                     example: Monthly salary
 *                   createdBy:
 *                     type: integer
 *                     example: 1
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2026-04-03T10:00:00.000Z
 *       401:
 *         description: Unauthorized (No token)
 *       403:
 *         description: Forbidden (Not allowed role)
 */