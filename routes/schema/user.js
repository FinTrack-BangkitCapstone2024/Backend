/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - password
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id
 *         name:
 *           type: string
 *           description: User's name
 *         password:
 *           type: string
 *           description: User's password
 *         email:
 *           type: String
 *           description: User's email
 *       example:
 *         id: d5fE_asz
 *         name: Bangkit2024
 *         password: BangkitNilaiA
 *         email: bangkit@gmail.com
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User managing API
 * /api/users/:
 *   get:
 *     summary: Lists all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       
 * /api/usaha/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       
 *   put:
 *      summary: Update the user by the id
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The user id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *      responses:
 *        200:
 *          description: The user was updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Book'
 *      
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The user was deleted
 */
