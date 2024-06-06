const Usaha = require('../models/usaha_model');
const getAllUsaha =  async (req, res) => {
  try {
    const items = await Usaha.getAll();
    res.status(200).json({code : 200, status : "success", data: items});
  } catch (error) {
    res.status(500).json({ code : 500, status : "error", message: error.message});
  }
}

const getUsaha = async(req, res) => {
  try {
    const usaha = await Usaha.findById(req.params.usahaId)
    
    if (usaha) {
      res.status(200).json({code : 200, status : "success", data: usaha});
    } else {
      res.status(500).json({ code : 404, status : "error", message: error.message});
    }
  } catch (error) {
    res.status(500).json({ code : 500, status : "error", message: error.message});
  }
}



module.exports = {
  getAllUsaha,
  getUsaha
}