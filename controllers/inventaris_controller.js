const Inventaris = require('../models/inventaris_model');
const getAllInventaris =  async (req, res) => {
  try {
    const items = await Inventaris.getAll();
    res.status(200).json({code : 200, status : "success", data: items});
  } catch (error) {
    res.status(500).json({ code : 500, status : "error", message: error.message});
  }
}

const getInventaris = async(req, res) => {
  try {
    const inventaris = await Inventaris.findById(req.params.inventarisId)
    if (inventaris) {
      res.status(200).json({code : 200, status : "success", data: inventaris});
    } else {
      res.status(500).json({ code : 404, status : "error", message: error.message});
    }
  } catch (error) {
    res.status(500).json({ code : 500, status : "error", message: error.message});
  }
}

const addInventaris = async (req, res) => {
  try {
    const inventaris = await Inventaris.add(req.body);
    res.status(201).json({ code : 201, status : "created", data : {id: inventaris.id} });
  } catch (error) {
    res.status(500).json({ code : 500, status : "error", message: error.message});
  }
}

const editInventaris = async (req, res) => {
  try {
    const inventaris = await Inventaris.edit(req.params.inventarisId, req.body);
    res.status(200).json({ code : 200, status : "edited", data: inventaris});
  } catch (error) {
    res.status(500).json({ code : 500, status : "error", message: error.message});
  }
}

module.exports = {
  getAllInventaris,
  getInventaris,
  addInventaris,
  editInventaris
}