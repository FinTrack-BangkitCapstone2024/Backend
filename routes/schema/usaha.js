/**
 * @swagger
 * components:
 *   schemas:
 *     Usaha:
 *       type: object
 *       required:
 *         - id
 *         - user_id
 *         - Nama_usaha
 *         - alamat
 *         - kecamatan
 *         - kota
 *         - provinsi
 *         - Jenis
 *         - Logo_path
 * 
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id
 *         user_id:
 *           type: string
 *           description: Unique ID of the user who owns the business
 *         Nama_usaha:
 *           type: string
 *           description: Business name
 *         Lokasi:
 *           description: Business location
 *           properties:
 *            alamat:
 *              type: string
 *              description: Business address
 *            kecamatan:
 *              type: string
 *              description: District of the business location
 *            kota:
 *              type: string
 *              description: City or Regency of the business location
 *            provinsi:
 *              type: string
 *              description: Province of the business location
 * 
 *         Jenis:
 *           type: string
 *           description: Business type (e.g., convenience store, coffee shop, etc.)
 *         Deskripsi:
 *           type: string
 *           description: Business description
 *         Logo_path:
 *           type: string
 *           description: Path or URL to the business logo
 * 
 *       example:
 *         id: d5fE_asz
 *         user_id: 60d0fe4f5311236168a109ca
 *         Nama_usaha: Warung Sederhana Mbak Eni
 *         Lokasi: { Alamat: "123 Main St", Kecamatan: "Central", Kota/Kab: "Jakarta", Provinsi: "DKI Jakarta" }
 *         Jenis: warung
 *         Deskripsi: Menjual kebutuhan sehari-hari
 *         Logo_path: "/images/logos/warung-mbak-eni.png"
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
