const { snapshotEqual } = require('firebase/firestore');
const { getFirestore, collection, getDocs, addDoc, updateDoc, doc, getDoc, deleteDoc } = require("firebase/firestore/lite");
const { firebaseApp} = require("../config/firebase");
const db = getFirestore(firebaseApp);
// const {db} = require('../config/firebase')
class Model {
  constructor(collectionName){
    this.collectionName = collectionName
    this.collectionRef = collection(db, collectionName);
    this.db = db;

  }

  async getAll(){
    const snapshot = await getDocs(this.collectionRef);
    const items = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    if(items.length > 0) return items;
    return []
  }

  async findById(id){
    const snapshot = await getDoc(doc(db, this.collectionName, id))
    if(snapshot.exists()){
      return snapshot.data()
    }else{
      return ["not found"]
    }
  }

  async findBy(field, value){
    const snapshot = await getDocs(this.collectionRef);
    const items = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    const item = items.find(item => item[field] == value)
    if(item) return item;
    return []
  }

  async add(body){
    const docRef = await addDoc(this.collectionRef, body);
    const id = docRef.id
    const updatedDocRef = await updateDoc(doc(db,this.collectionName,id ), {id:id, ...body})
    const item = await this.findById(id)
    return item;
  }

  async edit(id, body){
    const oldUser = await this.findById(id);
    if(oldUser.length == 0) {
      throw new Error('User not found')
    };
    await updateDoc(doc(db,this.collectionName,id ), body)
    return await this.findById(id);
  }

  async delete(id){
    const user = await this.findById(id);
    if(user.length == 0) {
      throw new Error('User not found')
    };
    await deleteDoc(doc(db, this.collectionName, id));
    return {id: id};
  }

}

module.exports = Model;

