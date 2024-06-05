const express = require('express');

const userRoutes = require('./user_routes');
const authRoutes = require('./auth_routes');
const usahaRoutes = require('./usaha_routes');
const financialRoutes = require('./financial_routes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/usaha', usahaRoutes);
router.use('/usaha', financialRoutes);

module.exports = router;