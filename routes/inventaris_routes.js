const express = require('express');

const router = express.Router();
const multer = require('multer');
const inventaris_controller = require('../controllers/inventaris_controller');

const sementara = () => {};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // limit file size to 5MB
});

router.get('/:usaha/inventaris', inventaris_controller.getAllInventaris);
router.get('/:usaha/inventaris/:inventarisId', inventaris_controller.getInventaris);
router.post('/', upload.single('file'), inventaris_controller.addInventaris);
router.put('/:usaha/inventaris/:inventarisId', inventaris_controller.editInventaris);

module.exports = router;
