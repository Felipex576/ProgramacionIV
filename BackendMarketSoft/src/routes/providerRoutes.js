const { Router } = require('express');
const providerController = require('../controllers/providerController');

const router = Router();

/**
 * @swagger
 * /api/providers:
 *   get:
 *     summary: Get all providers
 *     tags: [Providers]
 *     responses:
 *       200:
 *         description: List of all providers
 */
router.get('/', providerController.getAll);

/**
 * @swagger
 * /api/providers/{id}:
 *   get:
 *     summary: Get provider by ID
 *     tags: [Providers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Provider details
 *       404:
 *         description: Provider not found
 */
router.get('/:id', providerController.getById);

/**
 * @swagger
 * /api/providers:
 *   post:
 *     summary: Create a new provider
 *     tags: [Providers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               city:
 *                 type: string
 *     responses:
 *       201:
 *         description: Provider created
 *       400:
 *         description: Validation error
 */
router.post('/', providerController.create);

/**
 * @swagger
 * /api/providers/{id}:
 *   put:
 *     summary: Update a provider
 *     tags: [Providers]
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
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               city:
 *                 type: string
 *     responses:
 *       200:
 *         description: Provider updated
 *       404:
 *         description: Provider not found
 */
router.put('/:id', providerController.update);

/**
 * @swagger
 * /api/providers/{id}:
 *   delete:
 *     summary: Delete a provider
 *     tags: [Providers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Provider deleted
 *       404:
 *         description: Provider not found
 */
router.delete('/:id', providerController.delete);

module.exports = router;
