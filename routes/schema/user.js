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
 *   name: User
 *   description: User managing API
 * /api/users/:
 *   get:
 *     summary: Lists all the usaha
 *     tags: [Usaha]
 *     responses:
 *       200:
 *         description: The list of the usaha
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '/api/usaha/'
 *   post:
 *     summary: Create a new usaha
 *     tags: [Usaha]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The created usaha.
 *         content:
 *           application/json:
 *             schema:
 *               Usaha:
 *                  type: object
 *       500:
 *         description: Some server error
 * /usaha/{id}:
 *   get:
 *     summary: Get the book by id
 *     tags: [Usaha]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book was not found
 *   put:
 *    summary: Update the book by the id
 *    tags: [Usaha]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The book id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Book'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the book by id
 *     tags: [Usaha]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *
 *     responses:
 *       200:
 *         description: The book was deleted
 *       404:
 *         description: The book was not found
 */
