const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth')
const { auth } = require('../config/firebase')

const signInWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredential);
    if (userCredential) {
        res.status(200).json(userCredential);
    } else {
        res.status(404).json({ code: 404, message: "User not found" });
    }
} catch (error) {
        res.status(400).json({"terjadi Error" : "error",error});
    }
}

const createUserWithEmail =  async(req, res) =>{
  try{
    const {email, password} = req.body;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if(userCredential.user){
      res.status(201).json({"message" : "Berhasil membuat user", "user" : userCredential.user});
    }else{
      res.status(400).json({"error" : "Maaf terjadi error, user tidak ada"})
    }
  }catch(error){
    res.status(400).json(error);
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
