const express = require('express');

const router = express.Router();
const multer = require('multer');
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // limit file size to 2MB
});
const usaha_controller = require('../controllers/usaha_controller');
const validator = require('./validator');

const sementara = () => {};

router.get('/', usaha_controller.getAllUsaha);
router.get('/:usahaId', usaha_controller.getUsaha);
router.get('/owner/:userId', usaha_controller.getUsahaByOwner);
router.post('/', upload.single('file'), validator.usahaValidationRules(), validator.validate, usaha_controller.addUsaha);
router.put('/:usahaId', usaha_controller.editUsaha);

module.exports = router;
