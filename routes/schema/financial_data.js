/**
 * @swagger
 * components:
 *   schemas:
 *     Financial_data:
 *       type: object
 *       required:
 *         - user_id
 *         - usaha_id 
 *         - title
 *         - type
 *         - money
 *         - date
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id
 *         user_id:
 *           type: string
 *           description: Unique ID of the user who owns the financial data
 *         usaha_id:
 *           type: string
 *           description: Unique ID of the related business
 *         title:
 *           type: string
 *           description: Title of the financial entry
 *         type:
 *           type: string
 *           description: Type of financial entry (income or expense)
 *         money:
 *           type: number
 *           description: Amount of money in the financial entry
 *         description:
 *           type: string
 *           description: Description of the financial entry
 *         date:
 *           type: string
 *           description: Date of the financial entry
 * 
 *       example:
 *         id: d5fE_asz
 *         user_id: 60d0fe4f5311236168a109ca
 *         usaha_id: 60d0fe4f5311236168a109cb
 *         title: Bangkit2024
 *         type: masukan
 *         money: 100.500
 *         description: Purchase of Bangkit Education
 *         date: 2023-06-15
 *         balance: 500.000
 */

/**
 * @swagger
 * tags:
 *   name: Usaha
 *   description: Usaha managing API
 * /api/usaha/:
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
