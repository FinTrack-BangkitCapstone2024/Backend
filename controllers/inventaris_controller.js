const path = require('path');
const Inventaris = require('../models/inventaris_model');
const { db } = require('../config/firebase');
const bucket = require('../config/gcs');

const validator = require('../routes/validator');

const inventaris_controller = {
  getAllInventaris: async (req, res) => {
    try {
      const items = await Inventaris.getAll();
      res.status(200).json({ code: 200, status: 'success', data: items });
    } catch (error) {
      res.status(500).json({ code: 500, status: 'error', message: error.message });
    }
  },

  getInventaris: async (req, res) => {
    try {
      const inventaris = await Inventaris.findById(req.params.inventarisId);
      if (inventaris) {
        res.status(200).json({ code: 200, status: 'success', data: inventaris });
      } else {
        res.status(500).json({ code: 404, status: 'error', message: error.message });
      }
    } catch (error) {
      res.status(500).json({ code: 500, status: 'error', message: error.message });
    }
  },
  addInventaris: async (req, res) => {
    const { file } = req;

    if (!file) {
      return res.status(400).send('No image uploaded.');
    }

    const folderName = 'inventaris';
    const blob = bucket.file(`${folderName}/${req.file.originalname}`);
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
    });

    blobStream.on('error', (err) => res.status(500).send({ message: err.message }));

    blobStream.on('finish', async () => {
      const photo_url = `https://storage.googleapis.com/${bucket.name}/${folderName}/${blob.name}`;

      const Items = {
        user_id: req.body.user_id,
        photo_url: photo_url,
        item_name: req.body.item_name,
        item_type: req.body.item_type,
        quantity: req.body.quantity,
        unit: req.body.unit,
        description: req.body.description,
      };

      try {
        const inventaris = await Inventaris.add(Items);
        res.status(201).json({ code: 201, status: 'created', data: { id: inventaris.id } });
      } catch (error) {
        res.status(500).json({ code: 500, status: 'error', message: error.message });
      }
    });
    blobStream.end(file.buffer);
  },
  editInventaris: async (req, res) => {
    try {
      const inventaris = await Inventaris.edit(req.params.inventarisId, req.body);
      res.status(200).json({ code: 200, status: 'edited', data: inventaris });
    } catch (error) {
      res.status(500).json({ code: 500, status: 'error', message: error.message });
    }
  },
};

module.exports = inventaris_controller;
