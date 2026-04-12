const { Router } = require('express');
const saleController = require('../controllers/saleController');

const router = Router();

/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Get all sales
 *     tags: [Sales]
 *     responses:
 *       200:
 *         description: List of all sales with user info
 */
router.get('/', saleController.getAll);

/**
 * @swagger
 * /api/sales/{id}:
 *   get:
 *     summary: Get sale by ID
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sale details with products
 *       404:
 *         description: Sale not found
 */
router.get('/:id', saleController.getById);

/**
 * @swagger
 * /api/sales:
 *   post:
 *     summary: Create a new sale
 *     tags: [Sales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - details
 *             properties:
 *               userId:
 *                 type: integer
 *               details:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - quantity
 *                   properties:
 *                     productId:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *                       minimum: 1
 *     responses:
 *       201:
 *         description: Sale created with auto-calculated total
 *       400:
 *         description: Validation error or insufficient stock
 */
router.post('/', saleController.create);

/**
 * @swagger
 * /api/sales/{id}:
 *   put:
 *     summary: Update a sale (not allowed - total is auto-calculated)
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       400:
 *         description: Sales cannot be updated manually
 */
router.put('/:id', saleController.update);

/**
 * @swagger
 * /api/sales/{id}:
 *   delete:
 *     summary: Delete a sale
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sale deleted
 *       404:
 *         description: Sale not found
 */
router.delete('/:id', saleController.delete);

module.exports = router;
