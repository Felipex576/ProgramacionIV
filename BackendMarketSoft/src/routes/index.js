const express = require('express');
const providerRoutes = require('./providerRoutes');
const productRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');
const saleRoutes = require('./saleRoutes');
const saleDetailRoutes = require('./saleDetailRoutes');

const router = express.Router();

router.use('/providers', providerRoutes);
router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/sales', saleRoutes);
router.use('/sale-details', saleDetailRoutes);

module.exports = router;
