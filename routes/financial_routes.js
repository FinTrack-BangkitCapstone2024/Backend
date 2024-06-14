const express = require('express');

const multer = require('multer');
const financial_controller = require('../controllers/financial_controller');
const validator = require('./validator')

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.get('/:usahaId/financial', financial_controller.getAllFinancialByUsahaId);
router.get('/:usahaId/financial/:financialId', financial_controller.getFinancialById);
router.get('/:usahaId/weekly', financial_controller.getWeeklyFinancial);
router.get('/:usahaId/monthly', financial_controller.getMonthlyFinancial);
router.get('/financial/:financialId', financial_controller.getFinancialById);
router.get('/:usahaId/forecasting', financial_controller.forecasting);
router.get('/:usahaId/laporan', financial_controller.getLaporanHariIni);

router.post('/financial', validator.financialValidationRules(), validator.validate, financial_controller.addUsahaFinancial);
router.post('/financial/csv', upload.single('file'), financial_controller.addUsahaFinancialFromFile);

router.put('/:usahaId/financial/:financialId', financial_controller.editUsahaFinancial);

router.delete('/:usahaId/financial/:financialId', financial_controller.deleteUsahaFinancial);

module.exports = router;
