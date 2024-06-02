const { firebaseApp} = require("../config/firebase");

const { getFirestore, collection, getDocs, addDoc, updateDoc, doc, getDoc, deleteDoc } = require("firebase/firestore/lite");
const db = getFirestore(firebaseApp);

const getAllUsers = async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    console.log(querySnapshot.docs.map((doc) => doc.data()));
    res.status(200).json(querySnapshot.docs.map((doc) => doc.data()));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async(req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = querySnapshot.docs.map((doc) => doc.data());
    const user = users.find((user) => user.id === req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const addUser = async (req, res) => {
  try {
    const docRef = await addDoc(collection(db, "users"), req.body);
    const id = docRef.id;
    const user = { id: id, ...req.body };
    await updateDoc(doc(db, "users", id), user);
    res.status(201).json({ data : {id: docRef.id} });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editUser = async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = querySnapshot.docs.map((doc) => doc.data());
    const user = users.find((user) => user.id === req.params.id);
    if (user) {
      await updateDoc(doc(db, "users", req.params.id), req.body);
      const updatedUserDoc = await getDoc(doc(db, "users", req.params.id));
      const newUser = updatedUserDoc.data();
      res.status(200).json({ message: "User updated", data: newUser});
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const deleteUser = async (req, res) => {
  try {
    const userRef = await getDoc(doc(db, "users", req.params.id));
    const user = userRef.data();
    if (user) {
      await deleteDoc(doc(db, "users", req.params.id));
      res.status(200).json({ message: "User deleted", data: {id : req.params.id} });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllUsers,
  getUsers,
  addUser,
  editUser,
  deleteUser
};
