const Financial =  require('../models/financial_model')

const getAllFinancialByUsahaId = async (req, res) => {
  try {
    const items = await Financial.findBy('usaha_id', req.params.usahaId);
    res.status(200).json({code : 200, status : "success", data: items});
  } catch (error) {
    res.status(500).json({ code : 500, status : "error", message: error.message});
  }
}

const getFinancialById = async (req, res) => {
  try {
    const item = await Financial.findById(req.params.financialId);
    res.status(200).json({code : 200, status : "success", data: item});
  } catch (error) {
    res.status(500).json({ code : 500, status : "error", message: error.message});
  }
}

const addUsahaFinancial = async (req, res) => {
  try {
    const financial = await Financial.add(req.body);
    res.status(201).json({ code : 201, status : "created", data : {id: financial.id} });
  } catch (error) {
    res.status(500).json({ code : 500, status : "error", message: error.message});
  }
}

const editUsahaFinancial = async (req, res) => {
  try {
    const financial = await Financial.edit(req.params.financialId, req.body);
    res.status(200).json({ code : 200, status : "edited", data: financial});
  } catch (error) {
    res.status(500).json({ code : 500, status : "error", message: error.message});
  }
}

const deleteUsahaFinancial = async (req, res) => {
  try {
    await Financial.delete(req.params.financialId);
    res.status(200).json({ code : 200, status : "deleted", data: req.params.financialId});
  } catch (error) {
    res.status(500).json({ code : 500, status : "error", message: error.message});
  }
}




module.exports = {
  getAllFinancialByUsahaId,
  addUsahaFinancial,
  getFinancialById,
  editUsahaFinancial,
  deleteUsahaFinancial
}