const express = require('express');

const router = express.Router();
const usaha_controller = require('../controllers/usaha_controller');

const sementara = () => {};

router.get('/', usaha_controller.getAllUsaha);
router.get('/:usahaId', usaha_controller.getUsaha);
router.get('/owner/:userId', usaha_controller.getUsahaByOwner);
router.post('/', usaha_controller.addUsaha);
router.put('/:usahaId', usaha_controller.editUsaha);

module.exports = router;
