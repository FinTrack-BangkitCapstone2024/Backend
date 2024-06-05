const express = require('express')
const router = express.Router()
const {
  getUsaha,
  getAllUsaha
} = require('../controllers/usaha_controller')

const sementara = () => {}

router.get('/', getAllUsaha)
router.get('/:usahaId', getUsaha)

module.exports = router;
