//*************  ini adalah script yang digunakan untuk melakukan perubahan pada firestore *************//

// Mengupdate usahaId diubah menjadi usaha_id
const { getFirestore, collection, getDocs, addDoc, updateDoc, doc, getDoc, deleteDoc } = require("firebase/firestore/lite");
const { firebaseApp } = require('./firebase')
const db = getFirestore(firebaseApp);

async function updateUsahaIdAttribute() {
  try {
    const collectionRef = collection(db, 'financials');
    const snapshot = await getDocs(collectionRef);

    for (const docSnapshot of snapshot.docs) {
      const data = docSnapshot.data();
      if (data.usahaId) {
        const docRef = doc(db, 'financials', docSnapshot.id)
        await updateDoc(docRef, {
          usaha_id: data.usahaId,
          usahaId: null,
        });
        console.log('updated', docSnapshot.id)
      }
    }
  } catch (error) {
    console.log(error);
  }
}


// Menghapus semua usaha kecuali yang dispesfikkan
const usahaException = ['vECigkVTb8RdoKslDMvq'];
async function deleteAllUsahaExcept(usahaException){
  let i = 0;
  try {
    console.log("Memulai")
    const collectionRef = collection(db, 'usaha');
    const snapshot = await getDocs(collectionRef);

    for (const docSnapshot of snapshot.docs) {
      if (!usahaException.includes(docSnapshot.id)) {
        await deleteDoc(doc(db, 'usaha', docSnapshot.id));
        console.log('No ',i++,' deleted', docSnapshot.id)
      }
    }
  } catch (error) {
    console.log(error);
  }
  console.log("DONE")
}

// Menghapus semua financials kecuali yang dispesifikkan
const financialsException = ['8IiF2QJUANAZT2DUdGNC', 'NP54q5OBD71S5jVotEwC', '1']
async function deleteAllFinancialsExcept(financialException){
  let i = 0;
  console.log("Memulai")
  try {
    const collectionRef = collection(db, 'financials');
    const snapshot = await getDocs(collectionRef);

    for (const docSnapshot of snapshot.docs) {
      if (!financialException.includes(docSnapshot.id)) {
        await deleteDoc(doc(db, 'financials', docSnapshot.id));
        console.log('No ',i++,' deleted', docSnapshot.id)
      }
    }
  } catch (error) {
    console.log(error);
  }
  console.log("DONE")
}
// Menghapus semua financials dari usaha
const usahaId = 'xx8UNi7Qy3DGwsUc3Fc6';
async function deleteAllFinancialFromUsaha(usahaId){
  let i = 0;
  console.log("Memulai")
  try {
    const collectionRef = collection(db, 'usaha');
    const snapshot = await getDocs(collectionRef);

    for (const docSnapshot of snapshot.docs) {
      const data = docSnapshot.data();
      // if (data.usaha_id === usahaId) {
        await deleteDoc(doc(db, 'usaha', docSnapshot.id));
        console.log('No ',i++,' deleted', docSnapshot.id)
      // }
    }
  } catch (error) {
    console.log(error);
  }
  console.log("DONE")
}

// *** jalanin fungsi yagng diinginkan *** 
// updateUsahaIdAttribute();
// deleteAllUsahaExcept(usahaException);
// deleteAllFinancialsExcept(financialsException);
deleteAllFinancialFromUsaha(usahaId);