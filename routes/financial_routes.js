const express = require('express')

const sementara = () => {};

const router = express.Router()

router.get('/usaha/:usahaId/financial',sementara)
router.get('/usaha/:usahaId/financial/:financialId', sementara)

router.post('/usaha/:usahaId/financial/add', sementara)
router.put('/usaha/:usahaId/financial/:financialId', sementara)
router.delete('/usaha/:usahaId/financial/:financialId', sementara)

