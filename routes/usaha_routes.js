const express = require('express')
const router = express.Router()
const {
  getUsaha,
  getUsahaByOwner,
  getAllUsaha,
  addUsaha,
  editUsaha
} = require('../controllers/usaha_controller')

const sementara = () => {}

router.get('/', getAllUsaha)
router.get('/:usahaId', getUsaha)
router.get('/owner/:userId', getUsahaByOwner)
router.post('/', addUsaha)
router.put('/:usahaId', editUsaha)


module.exports = router;
