const express = require('express')

const sementara = () => {
  
};

const {getAllFinancialByUsahaId } = require('../controllers/financial_controller')


const router = express.Router()

router.get('/:usahaId/financial', getAllFinancialByUsahaId)
router.get('/:usahaId/financial/:financialId', sementara)

router.post('/:usahaId/financial/add', sementara)
router.put('/:usahaId/financial/:financialId', sementara)
router.delete('/:usahaId/financial/:financialId', sementara)

module.exports = router