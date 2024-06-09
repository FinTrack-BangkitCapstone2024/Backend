const Inventaris = require('../models/inventaris_model');
const { db } = require('../config/firebase');
const bucket = require('../config/gcs');
const path = require('path');

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
  const { nama, jumlah } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const blob = bucket.file(file.originalname);
  const blobStream = blob.createWriteStream({
    resumable: false,
    contentType: file.mimetype
  });

  blobStream.on('error', (err) => {
    return res.status(500).send({ message: err.message });
  });

  blobStream.on('finish', async () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

    const detailItem = 
    {
      'nama' : nama,
      'jumlah' : jumlah,
      'url': publicUrl
    };

    try {
      const inventaris = await Inventaris.add(detailItem);
      res.status(201).json({ code : 201, status : "created", data : {id: inventaris.id} });
    } catch (error) {
      res.status(500).json({ code : 500, status : "error", message: error.message});
    }
  });
  blobStream.end(file.buffer);
  };

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