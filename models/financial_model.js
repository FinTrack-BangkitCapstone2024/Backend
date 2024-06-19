const {
  getDocs, doc, getDoc, addDoc, updateDoc, query, where,
} = require('firebase/firestore/lite');
// const tf = require("@tensorflow/tfjs-node");
const axios = require('axios').default;

const dotenv = require('dotenv');
const Model = require('./model');
const { getYearlyFinancial } = require('../controllers/financial_controller');
const { all } = require('../routes');

dotenv.config();

class Financial extends Model {
  constructor() {
    super('financials');
  }

  namingDate(number) {
    switch (number) {
      case 0:
        return 'Sun';
      case 1:
        return 'Mon';
      case 2:
        return 'Tue';
      case 3:
        return 'Wed';
      case 4:
        return 'Thu';
      case 5:
        return 'Fri';
      case 6:
        return 'Sat';
      default:
        return 'Not Found';
    }
  }

  formatDateToYMD(dateString) {
    // Buat objek Date dari string tanggal
    const date = new Date(dateString);

    // Gunakan toISOString() dan ambil substring
    const formattedDate = date.toISOString().substring(0, 10);

    return formattedDate;
  }

  formatDateToYM(date) {
    const options = { day: 'numeric', month: 'short' };
    return date.toLocaleDateString('id-ID', options); // Menggunakan 'id-ID' untuk format bahasa Indonesia
  }




  async forecasting(usahaId) {
    const data_predicts = [];
    const snapshot = await getDocs(this.collectionRef);
    let items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    items = items.filter((item) => item.usaha_id == usahaId);
    const dates = [...new Set(items.map((item) => new Date(item.tanggal)))];
    const i = 0;
    console.log("== ALLL DATESS ", dates)
    for (const date of dates) {
      let current_pemasukan = 0;
      let current_pengeluaran = 0;
      const cur_date = this.formatDateToYMD(date)
      console.log("CURR DATE ==== ", cur_date)
      const q_all_current_pemasukan = query(this.collectionRef, where('tanggal', '==', cur_date));
      const all_current_pemasukan_snapshot = await getDocs(q_all_current_pemasukan);
      all_current_pemasukan_snapshot.forEach((doc) => {
        if (doc.data().tipe == 'pemasukan') {
          current_pemasukan += parseInt(doc.data().jumlah);
        } else if (doc.data().tipe == 'pengeluaran') {
          current_pengeluaran += parseInt(doc.data().jumlah);
        }
      });
      const data_predict = [current_pemasukan, current_pengeluaran];
      data_predicts.push(data_predict);
    }
    console.log(data_predicts);
    try {

      const MODEL_URL = process.env.MODEL_URL + "predict";
      console.log("Mengirim ke model di ", MODEL_URL, "\n dan datanya ", data_predicts)
      const response = await axios.post(MODEL_URL, { features: data_predicts });
      console.log("Selesai ke model")
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Error", error.response.data);
      return error.response.data;
    }
  }





  async getWeeklyFinancial(id_usaha) {
    const snapshot = await getDocs(this.collectionRef);
    let items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    items = items.filter((item) => item.usaha_id == id_usaha);

    // Menghapus duplikat dengan menggunakan string ISO
    const allDate = [...new Set(items.map((item) => new Date(item.tanggal).toISOString()))];

    // Mengubah kembali string ISO menjadi objek Date
    const allDateObjects = allDate.map(dateString => new Date(dateString));

    // Mengurutkan tanggal
    const allDateSorted = allDateObjects.sort((a, b) => b - a);
    console.log(allDateSorted);
    console.log(allDateSorted[0]);
    console.log(allDateSorted[6]);
    const weeklyMasukan = [0, 0, 0, 0, 0, 0, 0];
    const weeklyKeluaran = [0, 0, 0, 0, 0, 0, 0];
    const now = new Date();
    const utc = now.getTime();
    const wibOffset = 420;

    const wib = utc + (wibOffset * 60000);

    const maximumDay = allDateSorted[0];

    // console.log('items');
    // console.log(items);
    let tes = 0;
    items.forEach((item) => {
      // console.log('Date');
      const itemDate = new Date(new Date(item.tanggal));
      const index = ((maximumDay - itemDate) / (1000 * 3600 * 24));
      console.log("tes", index);
      console.log("maximumDay", maximumDay, " - ", itemDate, " = ", (maximumDay - itemDate) / (1000 * 3600 * 24));
      // console.log(index);
      // console.log(item);
      if (index >= 0 && index < 7 && item.usaha_id == id_usaha) {
        if (item.tipe == 'pengeluaran') {
          weeklyKeluaran[index] += parseInt(item.jumlah);
        }
        if (item.tipe == 'pemasukan') {
          weeklyMasukan[index] += parseInt(item.jumlah);
        }
      }
    });
    // if(weeklyMasukan.length > 0) return weeklyMasukan;
    console.log("weeklyKeluaran");
    console.log(weeklyKeluaran);
    console.log("weeklyMasukan");
    console.log(weeklyMasukan);
    const hari = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(maximumDay);
      date.setDate(maximumDay.getDate() - i);
      hari.push(this.formatDateToYM(date));
    }
    console.log(hari);
    const balance = [];
    for (let i = 0; i < 7; i++) {
      balance.push(weeklyMasukan[i] - weeklyKeluaran[i]);
    }
    return { day: hari.reverse(), masukan: weeklyMasukan.reverse(), pengeluaran: weeklyKeluaran.reverse(), balance: balance.reverse() };
  }
  async getMonthlyFinancial(id_usaha) {
    const snapshot = await getDocs(this.collectionRef);
    let items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    items = items.filter((item) => item.usaha_id == id_usaha);

    // Menghapus duplikat dengan menggunakan string ISO
    const allDate = [...new Set(items.map((item) => new Date(item.tanggal).toISOString()))];

    // Mengubah kembali string ISO menjadi objek Date
    const allDateObjects = allDate.map(dateString => new Date(dateString));
    const allDateSorted = allDateObjects.sort((a, b) => b - a);

    const now = new Date();
    const utc = now.getTime();
    const wibOffset = 420;

    const wib = utc + (wibOffset * 60000);

    const maximumDay = allDateSorted[0];
    const minimumDay = new Date(wib);

    minimumDay.setDate(maximumDay.getDate() - 30);

    const monthlyMasukan = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const monthlyKeluaran = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    items.forEach((item) => {
      const itemDate = new Date(new Date(item.tanggal));
      const index = ((maximumDay - itemDate) / (1000 * 3600 * 24));
      if (index >= 0 && index < 30) {
        if (item.tipe == 'pengeluaran') {
          monthlyKeluaran[index] += parseInt(item.jumlah);
        }
        if (item.tipe == 'pemasukan') {
          monthlyMasukan[index] += parseInt(item.jumlah);
        }
      }
    });
    const bulan = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date(maximumDay);
      console.log(date);
      date.setDate(maximumDay.getDate() - i);
      bulan.push(this.formatDateToYM(date));
    }

    const balance = [];
    for (let i = 0; i < 30; i++) {
      balance.push(monthlyMasukan[i] - monthlyKeluaran[i]);
    }
    return { tanggal: bulan.reverse(), masukan: monthlyMasukan.reverse(), pengeluaran: monthlyKeluaran.reverse(), balance: balance.reverse() };
  }

  async getYearlyFinancial(id_usaha) {
    const snapshot = await getDocs(this.collectionRef);
    let items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    items = items.filter((item) => item.usaha_id == id_usaha);

    // Menghapus duplikat dengan menggunakan string ISO
    const allDate = [...new Set(items.map((item) => new Date(item.tanggal).toISOString()))];

    // Mengubah kembali string ISO menjadi objek Date
    const allDateObjects = allDate.map(dateString => new Date(dateString));
    const now = new Date();
    const utc = now.getTime();
    const wibOffset = 420;

    const wib = utc + (wibOffset * 60000);

    const maximumDay = allDateObjects[0];
    const minimumDay = new Date(wib);

    minimumDay.setDate(maximumDay.getDate() - 365);


    const yearlyMasukan = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const yearlyKeluaran = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    items.forEach((item) => {
      const itemDate = new Date(new Date(item.tanggal));
      const index = (maximumDay.getFullYear() - itemDate.getFullYear()) * 12 + (maximumDay.getMonth() - itemDate.getMonth());
      if (index >= 0 && index < 12) {
        if (item.tipe == 'pengeluaran') {
          yearlyKeluaran[index] += parseInt(item.jumlah);
        }
        if (item.tipe == 'pemasukan') {
          yearlyMasukan[index] += parseInt(item.jumlah);
        }
      }
    });
    const bulan = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date(maximumDay);
      date.setMonth(maximumDay.getMonth() - i);
      bulan.push(date.toLocaleString('default', { month: 'short' }));
    }
    const balance = [];
    for (let i = 0; i < 12; i++) {
      balance.push(yearlyMasukan[i] - yearlyKeluaran[i]);
    }
    return { bulan: bulan.reverse(), masukan: yearlyMasukan.reverse(), pengeluaran: yearlyKeluaran.reverse(), balance: balance.reverse() };
  }


}


module.exports = new Financial();

