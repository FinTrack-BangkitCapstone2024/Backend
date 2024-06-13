const path = require('path');
const Inventaris = require('../models/inventaris_model');
const { db } = require('../config/firebase');
const bucket = require('../config/gcs');

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
    const {
      user_id, item_name, item_type, quantity, unit, description,
    } = req.body;
    const { file } = req;

    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
    });

    blobStream.on('error', (err) => res.status(500).send({ message: err.message }));

    blobStream.on('finish', async () => {
      const photo_url = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      const detailItem = {
        user_id,
        photo_url,
        item_name,
        item_type,
        quantity,
        unit,
        description,

      };

      try {
        const inventaris = await Inventaris.add(detailItem);
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
