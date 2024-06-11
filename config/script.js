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
async function deleteAllUsahaExcept(usahaException) {
  let i = 0;
  try {
    console.log("Memulai")
    const collectionRef = collection(db, 'usaha');
    const snapshot = await getDocs(collectionRef);

    for (const docSnapshot of snapshot.docs) {
      if (!usahaException.includes(docSnapshot.id)) {
        await deleteDoc(doc(db, 'usaha', docSnapshot.id));
        console.log('No ', i++, ' deleted', docSnapshot.id)
      }
    }
  } catch (error) {
    console.log(error);
  }
  console.log("DONE")
}

// Menghapus semua financials kecuali yang dispesifikkan
const financialsException = ['8IiF2QJUANAZT2DUdGNC', 'NP54q5OBD71S5jVotEwC', '1']
async function deleteAllFinancialsExcept(financialException) {
  let i = 0;
  console.log("Memulai")
  try {
    const collectionRef = collection(db, 'financials');
    const snapshot = await getDocs(collectionRef);

    for (const docSnapshot of snapshot.docs) {
      if (!financialException.includes(docSnapshot.id)) {
        await deleteDoc(doc(db, 'financials', docSnapshot.id));
        console.log('No ', i++, ' deleted', docSnapshot.id)
      }
    }
  } catch (error) {
    console.log(error);
  }
  console.log("DONE")
}
// Menghapus semua financials dari usaha
const usahaId = 'fxmYdMWEmHSYuP0sL9oS';
async function deleteAllFinancialFromUsaha(usahaId) {
  let i = 0;
  console.log("Memulai")
  try {
    const collectionRef = collection(db, 'financials');
    const snapshot = await getDocs(collectionRef);

    for (const docSnapshot of snapshot.docs) {
      const data = docSnapshot.data();
      // if (data.usaha_id === usahaId) {
      await deleteDoc(doc(db, 'usaha', docSnapshot.id));
      console.log('No ', i++, ' deleted', docSnapshot.id)
      // }
    }
  } catch (error) {
    console.log(error);
  }
  console.log("DONE")
}


// Memodifikasi CSV
const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');;
const { format } = require('fast-csv');

const filePath = path.join(__dirname, '..' , '..', 'newdummy_dataset.csv');
const newFilePath = path.join(__dirname,'..' ,'..','newFormateddummy_dataset.csv');

const modifyCSV = () => {
  const result = [];
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (data) => {
      console.log("mendapatkan data ...")
      data['title_pemasukan'] = "masukan dari jual",
      data['title_pengeluaran'] = "beli bahan"
      result.push(data);
    })
    .on('end', () => {
      const ws = fs.createWriteStream(newFilePath);
      const csvStream = format({ headers: true });
      
      csvStream.pipe(ws).on('finish', () => {
        console.log('CSV berhasil dimodifikasi');
      });


      result.forEach(record => {
        console.log("menulis data ...")
        console.log(record);
        csvStream.write(record);
      })

      csvStream.end();
    })
    .on('error', (error) => {
      console.log("Error ketika modif csv", error.message);
    })

}
// *** jalanin fungsi yagng diinginkan *** 
// updateUsahaIdAttribute();
// deleteAllUsahaExcept(usahaException);
// deleteAllFinancialsExcept(financialsException);
deleteAllFinancialFromUsaha(usahaId);
// modifyCSV();