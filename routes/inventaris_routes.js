const express = require('express')
const router = express.Router()
const multer = require('multer');
const {
  getAllInventaris,
  getInventaris,
  addInventaris,
  editInventaris
} = require('../controllers/inventaris_controller')

const sementara = () => {}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // limit file size to 5MB
});

router.get('/:usaha/inventaris', getAllInventaris)
router.get('/:usaha/inventaris/:inventarisId', getInventaris)
router.post('/', upload.single('file'),addInventaris)
router.put('/:usaha/inventaris/:inventarisId', editInventaris)

module.exports = router;
