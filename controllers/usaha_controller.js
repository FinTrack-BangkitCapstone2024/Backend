const Usaha = require('../models/usaha_model');
const User = require('../models/user_model');

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
    try {
      const usaha = await Usaha.add(req.body);
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
      console.log(req.params.userId)
      if (!user_data) { 
        res.status(404).json({ code: 404, status: 'error', message: "user tidak ada" });
      }

      const usaha = await Usaha.findBy('user_id', req.params.userId);
      const { user, ...usaha_without_user } = usaha;
      usaha_without_user.user = user_data;

      const data = {
        usaha: usaha_without_user,
      };

      if (usaha) {
        res.status(200).json({ code: 200, status: 'success', data: data });
      } else {
        res.status(404).json({ code: 404, status: 'error', message: "usaha tidak ada" });
      }
    } catch (error) {
      res.status(500).json({ code: 500, status: 'error', message: error.message });
    }
  },
};

module.exports = usaha_controller;
