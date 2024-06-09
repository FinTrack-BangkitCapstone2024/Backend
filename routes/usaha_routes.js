const express = require('express')
const router = express.Router()
const {
  getUsaha,
  getAllUsaha,
  addUsaha,
  editUsaha
} = require('../controllers/usaha_controller')

const sementara = () => {}

router.get('/', getAllUsaha)
router.get('/:usahaId', getUsaha)
router.post('/', addUsaha)
router.put('/:usahaId', editUsaha)


module.exports = router;
