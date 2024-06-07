const express = require('express')
const router = express.Router()
const {
  getAllInventaris,
  getInventaris,
  addInventaris,
  editInventaris
} = require('../controllers/inventaris_controller')

const sementara = () => {}

router.get('/:usaha/inventaris', getAllInventaris)
router.get('/:usaha/inventaris/:inventarisId', getInventaris)
router.post('/:usaha/inventaris', addInventaris)
router.put('/:usaha/inventaris/:inventarisId', editInventaris)

module.exports = router;
