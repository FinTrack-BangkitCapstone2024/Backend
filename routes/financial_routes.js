const express = require('express')

const sementara = () => {
  
};

const {
  getAllFinancialByUsahaId, 
  addUsahaFinancial,
  getFinancialById,
  editUsahaFinancial,
  deleteUsahaFinancial,
  getWeeklyFinancial,
  addUsahaFinancialFromFile
} = require('../controllers/financial_controller')


const multer = require('multer');
const upload = multer({storage:multer.memoryStorage()})

const router = express.Router()

router.get('/:usahaId/financial', getAllFinancialByUsahaId)
router.get('/:usahaId/financial/:financialId', getFinancialById)
router.get('/:usahaId/weekly', getWeeklyFinancial)
router.get('/financial/:financialId', getFinancialById)

router.post('/financial', addUsahaFinancial)
router.post('/financial/csv', upload.single("file") ,addUsahaFinancialFromFile)
router.put('/:usahaId/financial/:financialId', editUsahaFinancial)
router.delete('/:usahaId/financial/:financialId', deleteUsahaFinancial)

module.exports = router