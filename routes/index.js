const express = require('express');

const userRoutes = require('./user_routes');
const authRoutes = require('./auth_routes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;