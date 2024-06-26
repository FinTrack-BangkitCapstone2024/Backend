const Usaha = require('../models/usaha_model');
const User = require('../models/user_model');

const bucket = require('../config/gcs');

const usaha_controller = {
  getAllUsaha: async (req, res) => {
    try {
      const items = await Usaha.getAll();
      res.status(200).json({ code: 200, status: 'success', data: items });
    } catch (error) {
      res.status(500).json({ code: 500, status: 'error', message: error.message });
    }
  },
  getUsaha: async (req, res) => {
    try {
      const usaha = await Usaha.findById(req.params.usahaId);

      if (usaha) {
        res.status(200).json({ code: 200, status: 'success', data: usaha });
      } else {
        res.status(500).json({ code: 404, status: 'error', message: error.message });
      }
    } catch (error) {
      res.status(500).json({ code: 500, status: 'error', message: error.message });
    }
  },
  addUsaha: async (req, res) => {
    let photo_url = null
    const { file } = req;

    if (file) {
      const fileName = `${Date.now()}-${req.file.originalname}`;
      const folderName = 'logo';
      const blob = bucket.file(`${folderName}/${fileName}`);
      const blobStream = blob.createWriteStream({
        resumable: false,
        contentType: file.mimetype,
      });

      blobStream.on('error', (err) => res.status(500).send({ message: err.message }));

      blobStream.on('finish', async () => {
        photo_url = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      });
      blobStream.end(file.buffer);
    }


    const Items = {
      nama: req.body.nama,
      user_id: req.body.user_id,
      jenis: req.body.jenis,
      lokasi: req.body.lokasi,
    };

    Items.logo_path = photo_url ? photo_url : null;
    try {
      const usaha = await Usaha.add(Items);
      res.status(201).json({ code: 201, status: 'created', data: { id: usaha.id } });
    } catch (error) {
      res.status(500).json({ code: 500, status: 'error', message: error.message });
    }
  },
  editUsaha: async (req, res) => {
    try {
      const usaha = await Usaha.edit(req.params.usahaId, req.body);
      res.status(200).json({ code: 200, status: 'edited', data: usaha });
    } catch (error) {
      res.status(500).json({ code: 500, status: 'error', message: error.message });
    }
  },
  getUsahaByOwner: async (req, res) => {
    try {
      const user_data = await User.findById(req.params.userId);
      console.log(req.params.userId);
      if (!user_data) {
        res.status(404).json({ code: 404, status: 'error', message: 'user tidak ada' });
      }

      const usahas = await Usaha.findAllBy('user_id', req.params.userId);
      const data_usaha = [];
      for (const usaha of usahas) {
        data_usaha.push({
          id: usaha.id,
          nama: usaha.nama,
          logo_path: usaha.logo_path,
          lokasi: usaha.lokasi,
          jenis: usaha.jenis,
          total_pemasukan: usaha.total_pemasukan,
          total_pengeluaran: usaha.total_pengeluaran,
          balance: usaha.balance,
        });
      }
      const data = {
        usaha: data_usaha,
      };

      if (data_usaha.length > 0) {
        res.status(200).json({ code: 200, status: 'success', data: data });
      } else {
        res.status(404).json({ code: 404, status: 'error', message: 'usaha tidak ada' });
      }
    } catch (error) {
      res.status(500).json({ code: 500, status: 'error', message: error.message });
    }
  },
};

module.exports = usaha_controller;


