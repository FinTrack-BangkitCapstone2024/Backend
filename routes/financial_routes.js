const express = require('express')

const sementara = () => {
  
};

const {
  getAllFinancialByUsahaId, 
  addUsahaFinancial,
  getFinancialById,
  editUsahaFinancial,
  deleteUsahaFinancial
} = require('../controllers/financial_controller')


const router = express.Router()

router.get('/:usahaId/financial', getAllFinancialByUsahaId)
router.get('/:usahaId/financial/:financialId', getFinancialById)
router.get('/financial/:financialId', getFinancialById)

router.post('/financial', addUsahaFinancial)
router.put('/:usahaId/financial/:financialId', editUsahaFinancial)
router.delete('/:usahaId/financial/:financialId', deleteUsahaFinancial)

module.exports = router