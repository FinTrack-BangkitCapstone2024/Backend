const express = require('express');
const userRoutes = require('./user_routes');

const router = express.Router();

router.use('/users', userRoutes);

module.exports = router;