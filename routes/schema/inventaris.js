/**
 * @swagger
 * components:
 *   schemas:
 *     inventaris:
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
 *           description: Unique ID of the user who owns the inventaris
 *         photo_url:
 *           type: string
 *           description: URL to the inventaris photo
 *         item_name:
 *           type: string
 *           description: Name of the inventaris item
 *         item_type:
 *           type: string
 *           description: Type of the inventaris item
 *         quantity:
 *           type: number
 *           description: Quantity of the inventaris item
 *         unit:
 *           type: string
 *           description: Unit of the inventaris item
 *         description:
 *           type: string
 *           description: Description of the inventaris item
 *       example:
 *         id: d5fE_asz
 *         user_id: 60d0fe4f5311236168a109ca
 *         photo_url: /images/inventaris/bangkit.jpg
 *         item_name: Paket Bangkit
 *         item_type: Book
 *         quantity: 50
 *         unit: pieces
 *         description: Paket Buku Tugas untuk menghadapi ujian Bangkit
 */

/**
 * @swagger
 * tags:
 *   name: Inventaris
 *   description: Inventaris managing API
 * /api/inventaris/{usahaId}/inventaris:
 *   get:
 *     summary: Lists all inventaris items for a specific business
 *     tags: [Inventaris]
 *     parameters:
 *       - in: path
 *         name: usahaId
 *         schema:
 *           type: string
 *         required: true
 *         description: The business id
 *     responses:
 *       200:
 *         description: The list of inventaris items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Inventaris'
 * /api/inventaris/{usahaId}/inventaris/{inventarisId}:
 *   get:
 *     summary: Get the inventaris item by id
 *     tags: [Inventaris]
 *     parameters:
 *       - in: path
 *         name: usahaId
 *         schema:
 *           type: string
 *         required: true
 *         description: The business id
 *       - in: path
 *         name: inventarisId
 *         schema:
 *           type: string
 *         required: true
 *         description: The inventaris item id
 *     responses:
 *       200:
 *         description: The inventaris item response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventaris'
 * 
 *   put:
 *     summary: Update the inventaris item by id
 *     tags: [Inventaris]
 *     parameters:
 *       - in: path
 *         name: usahaId
 *         schema:
 *           type: string
 *         required: true
 *         description: The business id
 *       - in: path
 *         name: inventarisId
 *         schema:
 *           type: string
 *         required: true
 *         description: The inventaris item id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inventaris'
 *     responses:
 *       200:
 *         description: The inventaris item was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventaris'
 * /api/inventaris/:
 *   post:
 *     summary: Create a new inventaris item
 *     tags: [Inventaris]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               data:
 *                 type: object
 *                 $ref: '#/components/schemas/Inventaris'
 *       responses:
 *         200:
 *           description: The created inventaris item.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Inventaris'
 *  
 */
