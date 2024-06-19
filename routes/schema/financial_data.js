/**
 * @swagger
 * components:
 *   schemas:
 *     Financial:
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
 *           description: Title of the usaha entry
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
 *         money: 100500
 *         description: Purchase of Bangkit Education
 *         date: 2023-06-15
 *         balance: 500000
 */

/**
 * @swagger
 * tags:
 *   name: Financial
 *   description: Financial managing API
 * /api/usaha/{usahaId}/financial:
 *   get:
 *     summary: Lists all the usaha
 *     tags: [Financial]
 *     responses:
 *       200:
 *         description: The list of the usaha
 *         content:
 *           application/json:
 *             schemaWS:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Financial'
 * 
 * /api/usaha/{usahaId}/financial/{financialId}:
 *   get:
 *     summary: Get the financial by financialId
 *     tags: [Financial]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The usaha id
 *     responses:
 *       200:
 *         description: The usaha response by id
 *         contens:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Financial'
 *   delete:
 *     summary: Delete financial data
 *     tags: [Financial]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The usaha id
 *     responses:
 *       200:
 *         description: The usaha response by id
 *         contens:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Financial'
 * 
 *   put:
 *    summary: Update the financial by the id
 *    tags: [Financial]
 *    parameters:
 *      - in: path
 *        name: usahaId
 *        schema:
 *          type: string
 *        required: true
 *        description: The usaha id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Financial'
 * 
 *    responses:
 *      200:
 *        description: The financial was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/financial'
 * 
 * /api/usaha/{usahaId}/analysis:
 *   get:
 *     summary: Get the financial analisys
 *     tags: [Financial]
 *     parameters:
 *       - in: path
 *         name: Userid
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The financial analysis
 *         content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/financial'
 * /api/usaha/{usahaId}/weekly:
 *   get:
 *     summary: Get the financial weekly analisys
 *     tags: [Financial]
 *     parameters:
 *       - in: path
 *         name: Userid
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The financial analysis
 *         content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/financial'
 * /api/usaha/{usahaId}/monthly:
 *   get:
 *     summary: Get the financial analisys
 *     tags: [Financial]
 *     parameters:
 *       - in: path
 *         name: Userid
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The financial analysis
 *         content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/financial'
 * /api/usaha/{usahaId}/yearly:
 *   get:
 *     summary: Get the financial analisys
 *     tags: [Financial]
 *     parameters:
 *       - in: path
 *         name: Userid
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The financial analysis
 *         content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/financial'
 * /api/usaha/{usahaId}/forecasting:
 *   get:
 *     summary: Get the forecasting financial analisys
 *     tags: [Financial]
 *     parameters:
 *       - in: path
 *         name: Userid
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The financial analysis
 *         content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/financial'
 * /api/usaha/{usahaId}/laporan:
 *   get:
 *     summary: Get the financial analisys
 *     tags: [Financial]
 *     parameters:
 *       - in: path
 *         name: Userid
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The financial analysis
 *         content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/financial'
 * /api/usaha/financial:
 *   post:
 *     summary: Add financial data
 *     tags: [Financial]
 *     parameters:
 *       - in: path
 *         name: Userid
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The financial analysis
 *         content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/financial'
 * /api/usaha/financial/csv:
 *   post:
 *     summary: Add financial data with csv
 *     tags: [Financial]
 *     parameters:
 *       - in: path
 *         name: Userid
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The financial analysis
 *         content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/financial'
 */
