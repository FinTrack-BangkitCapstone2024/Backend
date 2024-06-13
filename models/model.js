const { snapshotEqual } = require('firebase/firestore');
const {
  getFirestore, collection, getDocs, addDoc, updateDoc, doc, getDoc, deleteDoc,
} = require('firebase/firestore/lite');
const { firebaseApp } = require('../config/firebase');

const db = getFirestore(firebaseApp);
// const {db} = require('../config/firebase')
class Model {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.collectionRef = collection(db, collectionName);
    this.db = db;
  }

  async getAll() {
    const snapshot = await getDocs(this.collectionRef);
    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    if (items.length > 0) return items;
    return null;
  }

  async findById(id) {
    const snapshot = await getDoc(doc(db, this.collectionName, id));
    if (snapshot.exists()) {
      return snapshot.data();
    }
    return null;
  }

  async findAllBy(field, value, sortField = null, sortOrder = 'asc') {
    const snapshot = await getDocs(this.collectionRef);
    let items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    items = items.filter((item) => item[field] == value);

    if (sortField) {
      items.sort((a,b) => {
        let a_val = a[sortField];
        let b_val = b[sortField];
        if(sortField == 'tanggal') {
          a_val = new Date(a[sortField])
          b_val = new Date(b[sortField]) 
        }else if(sortField == 'jumlah') {
          a_val = parseInt(a[sortField])
          b_val = parseInt(b[sortField])
        }
        if (sortOrder == 'asc') {
          return a_val > b_val ? 1 : -1;
        }else{
          return a_val < b_val ? 1 : -1;
        }
      })
    }

    return items.length > 0 ? items : null;
  }

  async findBy(field, value) {
    const snapshot = await getDocs(this.collectionRef);
    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log(items);
    const item = items.find((item) => item[field] == value);
    if (item) return item;
    return null;
  }

  async add(body) {
    const docRef = await addDoc(this.collectionRef, body);
    const { id } = docRef;
    const updatedDocRef = await updateDoc(doc(db, this.collectionName, id), { id, ...body });
    const item = await this.findById(id);
    return item;
  }

  async edit(id, body) {
    const oldUser = await this.findById(id);
    if (oldUser.length == 0) {
      throw new Error('User not found');
    }
    console.log("body", body);
    await updateDoc(doc(db, this.collectionName, id), body);
    return await this.findById(id);
  }

  async delete(id) {
    const user = await this.findById(id);
    if (user.length == 0) {
      throw new Error('User not found');
    }
    await deleteDoc(doc(db, this.collectionName, id));
    return { id };
  }
}

module.exports = Model;
