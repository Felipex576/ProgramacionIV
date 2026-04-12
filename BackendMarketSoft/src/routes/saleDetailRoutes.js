const { Router } = require('express');
const saleDetailController = require('../controllers/saleDetailController');

const router = Router();

/**
 * @swagger
 * /api/sale-details:
 *   get:
 *     summary: Get all sale details
 *     tags: [SaleDetails]
 *     responses:
 *       200:
 *         description: List of all sale details
 */
router.get('/', saleDetailController.getAll);

/**
 * @swagger
 * /api/sale-details/{id}:
 *   get:
 *     summary: Get sale detail by ID
 *     tags: [SaleDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sale detail info
 *       404:
 *         description: Sale detail not found
 */
router.get('/:id', saleDetailController.getById);

/**
 * @swagger
 * /api/sale-details:
 *   post:
 *     summary: Create a new sale detail
 *     tags: [SaleDetails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - saleId
 *               - productId
 *               - quantity
 *               - price
 *             properties:
 *               saleId:
 *                 type: integer
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Sale detail created
 *       400:
 *         description: Validation error
 */
router.post('/', saleDetailController.create);

/**
 * @swagger
 * /api/sale-details/{id}:
 *   put:
 *     summary: Update a sale detail
 *     tags: [SaleDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               saleId:
 *                 type: integer
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Sale detail updated
 *       404:
 *         description: Sale detail not found
 */
router.put('/:id', saleDetailController.update);

/**
 * @swagger
 * /api/sale-details/{id}:
 *   delete:
 *     summary: Delete a sale detail
 *     tags: [SaleDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sale detail deleted
 *       404:
 *         description: Sale detail not found
 */
router.delete('/:id', saleDetailController.delete);

module.exports = router;
