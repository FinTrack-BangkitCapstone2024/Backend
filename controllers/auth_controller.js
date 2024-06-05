const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth')
const { auth } = require('../config/firebase')
const User = require('../models/user_model')

const signInWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = await User.findBy('email', email);
    if (userCredential.user) {
        res.status(200).json({ code : 200, status : "success", data: {user: user, token: userCredential.user.stsTokenManager}});
    } else {
        res.status(404).json({ code: 404, message: "User not found" });
    }
} catch (error) {
        res.status(500).json({ code : 500, status : "error", data: {message: error.message}});
    }
}

const createUserWithEmail =  async(req, res) =>{
  try{
    
    const {email, password, name} = req.body;
    const oldUser = await User.findBy('email', email);
    if(oldUser.email) {
      res.status(500).json({ code : 500, status : "error", data: {message: error.message}});
    };
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const newUser = await User.add({email, password, name})
    if(userCredential.user){
      res.status(201).json({ code : 200, status : "created", data: {user :newUser, token : userCredential.user.stsTokenManager}});
    }else{
      res.status(400).json({"error" : "Maaf terjadi error, user tidak ada"})
    }
  }catch(error){
    res.status(500).json({ code : 500, status : "error", data: {message: error.message}});
  }
}

const test = async(req, res) => {
  try {
    res.status(200).json("Test");
  } catch (error) {
    res.status(400).json(error);
}
}


module.exports = {
    signInWithEmail,
    createUserWithEmail,
    test
}
