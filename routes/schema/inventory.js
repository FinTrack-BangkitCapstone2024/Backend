/**
 * @swagger
 * components:
 *   schemas:
 *     inventory:
 *       type: object
 *       required:
 *         - user_id
 *         - photo_url
 *         - item_name
 *         - item_type
 *         - quantity
 *         - unit
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id
 *         user_id:
 *           type: string
 *           description: Unique ID of the user who owns the inventory
 *         photo_url:
 *           type: string
 *           description: URL to the inventory photo
 *         item_name:
 *           type: string
 *           description: Name of the inventory item
 *         item_type:
 *           type: string
 *           description: Type of the inventory item
 *         quantity:
 *           type: number
 *           description: Quantity of the inventory item
 *         unit:
 *           type: string
 *           description: Unit of the inventory item
 *         description:
 *           type: string
 *           description: Description of the inventory item
 *       example:
 *         id: d5fE_asz
 *         user_id: 60d0fe4f5311236168a109ca
 *         photo_url: /images/inventory/bangkit.jpg
 *         item_name: Paket Bangkit
 *         item_type: Book
 *         quantity: 50
 *         unit: pieces
 *         description: Paket Buku Tugas untuk menghadapi ujian Bangkit
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
