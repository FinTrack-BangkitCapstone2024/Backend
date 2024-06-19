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
 *   name: Inventaris
 *   description: Inventaris managing API
 * /api/inventaris/{usahaId}/inventaris:
 *   get:
 *     summary: Lists all inventory items for a specific business
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
 *         description: The list of inventory items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Inventory'
 * /api/inventaris/{usahaId}/inventaris/{inventarisId}:
 *   get:
 *     summary: Get the inventory item by id
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: usahaId
 *         schema:
 *           type: string
 *         required: true
 *         description: The business id
 *       - in: path
 *        name: inventarisId
 *         schema:
 *           type: string
 *         required: true
 *         description: The inventory item id
 *     responses:
 *       200:
 *         description: The inventory item response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventory'
 * /api/inventaris/:
 *   post:
 *     summary: Create a new inventory item
 *     tags: [Inventory]
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
 *                 $ref: '#/components/schemas/Inventory'
 *       responses:
 *         200:
 *           description: The created inventory item.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Inventory'
 * /api/inventaris/{usahaId}/inventaris/{inventarisId}:
 *   put:
 *     summary: Update the inventory item by id
 *     tags: [Inventory]
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
 *         description: The inventory item id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inventory'
 *     responses:
 *       200:
 *         description: The inventory item was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventory'
 */
