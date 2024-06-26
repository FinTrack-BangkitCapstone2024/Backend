const { body, validationResult } = require('express-validator');
const inventaris_controller = require('../controllers/inventaris_controller');

const validator = {
  signInValidationRules: () => [body('email').isEmail().withMessage('Email is not valid'), body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')],

  signUpValidationRules: () => [
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
  ],

  financialValidationRules: () => [
    body('tanggal').notEmpty().withMessage('Tanggal must not be empty'),
    body('jumlah').isNumeric().withMessage('Jumlah must be a number').notEmpty().withMessage('Jumlah must not be empty'),
    body('tipe').isIn(['pemasukan', 'pengeluaran']).withMessage('Tipe must be pemasukan or pengeluaran'),
    body('usaha_id').notEmpty().withMessage('Usaha ID must not be empty'),
    body('description').notEmpty().withMessage('description must not be empty'),
  ],

  usahaValidationRules: () => [
    body('nama').notEmpty().withMessage('Nama usaha must not be empty'),
    body('user_id').notEmpty().withMessage('User ID must not be empty'),
    body('jenis').notEmpty().withMessage('Jenis usaha must not be empty'),
    body('lokasi').notEmpty().withMessage('lokasi usaha must not be empty'),
  ],

  inventarisValidationRules: () => [
    body('item_name').notEmpty().withMessage('item_name must not be empty'),
    body('item_type').notEmpty().withMessage('item_type must not be empty'),
    body('quantity').notEmpty().isNumeric().withMessage('quantity usaha must not be empty'),
    body('unit').notEmpty().withMessage('Unit must not be empty'),
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
