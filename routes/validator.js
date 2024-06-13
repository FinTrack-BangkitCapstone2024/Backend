const { body, validationResult } = require('express-validator');

const validator = {

  signInValidationRules: () => [
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  ],

  signUpValidationRules: () => [
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
  ],

  validate: (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));
    res.status(422).json({ code: 422, status: 'error', message: extractedErrors });
  },
};

module.exports = validator;
