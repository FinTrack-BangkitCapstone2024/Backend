const express = require('express')
const router = express.Router()
const {
  getUsaha,
  getAllUsaha,
<<<<<<< Updated upstream
  addUsaha
=======
  addUsaha,
  editUsaha
>>>>>>> Stashed changes
} = require('../controllers/usaha_controller')

const sementara = () => {}

router.get('/', getAllUsaha)
router.get('/:usahaId', getUsaha)
router.post('/', addUsaha)
<<<<<<< Updated upstream
=======
router.put('/:usahaId', editUsaha)
>>>>>>> Stashed changes


module.exports = router;
