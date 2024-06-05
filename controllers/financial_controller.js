const Financial =  require('../models/financial_model')

const getAllFinancialByUsahaId = async (req, res) => {
  try {
    const items = await Financial.findBy('usaha_id', req.params.usahaId);
    res.status(200).json({code : 200, status : "success", data: items});
  } catch (error) {
    res.status(500).json({ code : 500, status : "error", data: {message: error.message}});
  }
}


module.exports = {
  getAllFinancialByUsahaId
}