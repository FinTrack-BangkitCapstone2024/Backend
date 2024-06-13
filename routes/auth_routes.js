const express = require('express');
const auth_controller = require('../controllers/auth_controller');

const { signInValidationRules, validate } = require('./validator');

const router = express.Router();

router.post('/signInWithEmail', signInValidationRules(), validate, auth_controller.signInWithEmail);
router.post('/signUpWithEmail', auth_controller.createUserWithEmail);


module.exports = router;
