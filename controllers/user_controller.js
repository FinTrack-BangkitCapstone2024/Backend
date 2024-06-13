const {
  getFirestore, collection, getDocs, addDoc, updateDoc, doc, getDoc, deleteDoc,
} = require('firebase/firestore/lite');
const { firebaseApp } = require('../config/firebase');

const db = getFirestore(firebaseApp);
const User = require('../models/user_model');

const user_controller = {
  getAllUsers: async (req, res) => {
    try {
      const items = await User.getAll();
      res.status(200).json({ code: 200, status: 'success', data: items });
    } catch (error) {
      res.status(500).json({ code: 500, status: 'error', message: error.message });
    }
  },
  getUsers: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        res.status(200).json({ code: 200, status: 'success', data: user });
      } else {
        res.status(500).json({ code: 404, status: 'error', message: error.message });
      }
    } catch (error) {
      res.status(500).json({ code: 500, status: 'error', message: error.message });
    }
  },
  addUser: async (req, res) => {
    try {
      const oldUser = await User.findBy('email', req.body.email);
      console.log(oldUser);
      if (oldUser.email) {
        throw new Error('Email already exists');
      }
      const user = await User.add(req.body);
      res.status(201).json({ code: 201, status: 'created', data: { id: user.id } });
    } catch (error) {
      res.status(500).json({ code: 500, status: 'error', message: error.message });
    }
  },

  editUser: async (req, res) => {
    try {
      const user = await User.edit(req.params.id, req.body);
      res.status(200).json({ code: 200, status: 'edited', data: user });
    } catch (error) {
      res.status(500).json({ code: 500, status: 'error', message: error.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.delete(req.params.id);
      res.status(200).json({ code: 200, status: 'deleted', data: req.params.id });
    } catch (error) {
      res.status(500).json({ code: 500, status: 'error', message: error.message });
    }
  },
};
module.exports = user_controller;
