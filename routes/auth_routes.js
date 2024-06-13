const express = require('express');
const auth_controller = require('../controllers/auth_controller');

const validator = require('./validator');

const router = express.Router();

router.post('/signInWithEmail', validator.signInValidationRules(), validator.validate, auth_controller.signInWithEmail);
router.post('/signUpWithEmail', auth_controller.createUserWithEmail);


module.exports = router;
