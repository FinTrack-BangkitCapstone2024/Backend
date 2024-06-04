
const { getFirestore, collection, getDocs, addDoc, updateDoc, doc, getDoc, deleteDoc } = require("firebase/firestore/lite");
const { firebaseApp} = require("../config/firebase");
const db = getFirestore(firebaseApp);
const User = require('../models/user')

const getAllUsers = async (req, res) => {
  try {
    const items = await User.getAll();
    res.status(200).json({code : 200, status : "success", data: items});
  } catch (error) {
    res.status(500).json({ code : 500, status : "error", data: {message: error.message}});
  }
};

const getUsers = async(req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (user) {
      res.status(200).json({code : 200, status : "success", data: user});
    } else {
      res.status(500).json({ code : 404, status : "error", data: {message: error.message}});
    }
  } catch (error) {
    res.status(500).json({ code : 500, status : "error", data: {message: error.message}});
  }
}

const addUser = async (req, res) => {
  try {
    const oldUser = await this.findBy('email', body.email);
    console.log(oldUser)
    if(oldUser.email) {
      throw new Error('Email already exists')
    };
    const user = await User.add(req.body);
    res.status(201).json({ code : 201, status : "created", data : {id: user.id} });
  } catch (error) {
    res.status(500).json({ code : 500, status : "error", data: {message: error.message}});
  }
};


const editUser = async (req, res) => {
  try {
    const user = await User.edit(req.params.id, req.body);
    res.status(200).json({ code : 200, status : "edited", message: "User updated", data: user});
  } catch (error) {
    res.status(500).json({ code : 500, status : "error", data: {message: error.message}});
  }
}

const deleteUser = async (req, res) => {
  try {
    await User.delete(req.params.id);
    res.status(200).json({ code : 200, status : "deleted", message: "User updated", data: req.params.id});
  } catch (error) {
    res.status(500).json({ code : 500, status : "error", data: {message: error.message}});
  }
}

module.exports = {
  getAllUsers,
  getUsers,
  addUser,
  editUser,
  deleteUser
};
