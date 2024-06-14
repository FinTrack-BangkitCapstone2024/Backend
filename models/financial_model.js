const {
  getDocs, doc, getDoc, addDoc, updateDoc, query, where,
} = require('firebase/firestore/lite');
// const tf = require("@tensorflow/tfjs-node");

const dotenv = require('dotenv');
const Model = require('./model');

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

  async getWeeklyFinancial(id_usaha) {
    const now = new Date();
    const utc = now.getTime();
    const wibOffset = 420;

    const wib = utc + (wibOffset * 60000);

    const maximumDay = new Date(wib);
    const minimumDay = new Date(wib);

    minimumDay.setDate(maximumDay.getDate() - 7);

    const snapshot = await getDocs(this.collectionRef);
    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const weeklyMasukan = [0, 0, 0, 0, 0, 0, 0];
    const weeklyKeluaran = [0, 0, 0, 0, 0, 0, 0];
    console.log('items');
    console.log(items);
    items.forEach((item) => {
      console.log('Date');
      const itemDate = new Date(new Date(item.tanggal).getTime() + (wibOffset * 60000));
      const index = (maximumDay.getDate() - itemDate.getDate());
      console.log(index);
      console.log(item);
      if (index >= 0 && item.usaha_id == id_usaha) {
        if (item.tipe == 'pengeluaran') {
          weeklyKeluaran[index] += parseInt(item.jumlah);
        }
        if (item.tipe == 'pemasukan') {
          weeklyMasukan[index] += parseInt(item.jumlah);
        }
      }
    });
    // if(weeklyMasukan.length > 0) return weeklyMasukan;
    const hari = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(maximumDay);
      date.setDate(maximumDay.getDate() - i);
      hari.push(this.namingDate(date.getDay()));
    }
    console.log(hari);
    return { day: hari.reverse(), masukan: weeklyMasukan.reverse(), pengeluaran: weeklyKeluaran.reverse() };
  }

  formatDateToYMD(dateString) {
    // Buat objek Date dari string tanggal
    const date = new Date(dateString);

    // Gunakan toISOString() dan ambil substring
    const formattedDate = date.toISOString().substring(0, 10);

    return formattedDate;
  }

  async forecasting(usahaId) {
    const data_predicts = [];
    const all_data = await this.getAll();
    const dates = [...new Set(all_data.map((item) => new Date(item.tanggal)))];
    const i = 0;
    for (const date of dates) {
      let current_pemasukan = 0;
      let current_pengeluaran = 0;
      const q_all_current_pemasukan = query(this.collectionRef, where('tanggal', '==', this.formatDateToYMD(date)), where('usaha_id', '==', usahaId));
      const all_current_pemasukan_snapshot = await getDocs(q_all_current_pemasukan);
      all_current_pemasukan_snapshot.forEach((doc) => {
        if (doc.data().tipe == 'pemasukan') {
          current_pemasukan += parseInt(doc.data().jumlah);
        } else if (doc.data().tipe == 'pengeluaran') {
          current_pengeluaran += parseInt(doc.data().jumlah);
        }
      });
      // console.log(`${this.formatDateToYMD(date)} : ${current_pemasukan} dan pengeluaran ${current_pengeluaran}`);
      const data_predict = [current_pemasukan, current_pengeluaran];
      data_predicts.push(data_predict);
    }
    console.log(data_predicts);

    const windowSize = 360;
    const predictDays = 30;
    const model = this.loadModel;
    const futureSalesAndSpend = await this.makePredictions(model, data_predicts, windowSize, predictDays);
    console.log(futureSalesAndSpend);
    return [futureSalesAndSpend];
  }

  async loadModel() {
    const model = await tf.loadLayerModel(process.env.MODEL_URL);
    return model;
  }

  async makePredictions(model, salesAndSpend, windowSize = 360, predictDays = 30) {
    const futureSalesAndSpend = [];
    let xInputPredict = salesAndSpend.slice(-windowSize); // Get last `windowSize` elements

    for (let i = 0; i < predictDays; i++) {
      // Reshape input data for model prediction
      const xInputTensor = tf.tensor(xInputPredict).reshape([1, windowSize, 2]);

      // Make prediction
      let prediction = model.predict(xInputTensor);
      prediction = prediction.arraySync()[0]; // Convert tensor to array
u 
      // Store predicted values
      futureSalesAndSpend.push(prediction);

      // Roll the array to remove the first element
      xInputPredict = xInputPredict.slice(1);

      // Update xInputPredict with the prediction
      xInputPredict.push(prediction);
    }

    return futureSalesAndSpend;
  }

  async getMonthlyFinancial(id_usaha) {
    const now = new Date();
    const utc = now.getTime();
    const wibOffset = 420;

    const wib = utc + (wibOffset * 60000);

    const maximumDay = new Date(wib);
    const minimumDay = new Date(wib);

    minimumDay.setDate(maximumDay.getDate() - 30);

    const snapshot = await getDocs(this.collectionRef);
    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const monthlyMasukan = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const monthlyKeluaran = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    items.forEach((item) => {
      const itemDate = new Date(new Date(item.tanggal).getTime() + (wibOffset * 60000));
      const index = (maximumDay.getMonth() - itemDate.getMonth());
      if (index >= 0 && item.usaha_id == id_usaha) {
        if (item.tipe == 'pengeluaran') {
          monthlyKeluaran[index] += parseInt(item.jumlah);
        }
        if (item.tipe == 'pemasukan') {
          monthlyMasukan[index] += parseInt(item.jumlah);
        }
      }
    });
    const bulan = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date(maximumDay);
      date.setMonth(maximumDay.getMonth() - i);
      bulan.push(date.toLocaleString('default', { month: 'long' }));
    }
    return { bulan: bulan.reverse(), masukan: monthlyMasukan.reverse(), pengeluaran: monthlyKeluaran.reverse() };
  }
}

module.exports = new Financial();

// const model = await this.loadModel();
// const snapshot = await getDocs(this.collectionRef);
// const items = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
// const data = [];
// items.forEach(item => {
//   data.push([item.tanggal, item.jumlah]);
// });
// const input = [];
// const output = [];
// for (let i = 0; i < data.length - 1; i++) {
//   input.push(data[i][1]);
//   output.push(data[i + 1][1]);
// }
// const inputTensor = tf.tensor2d(input, [input.length, 1]);
// const outputTensor = tf.tensor2d(output, [output.length, 1]);

// model.add(tf.layers.dense({units: 1, inputShape: [1]}));
// model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
// await model.fit(inputTensor, outputTensor, {epochs: 100});
// const forecast = await model.predict(tf.tensor2d([input[input.length - 1]], [1, 1]));
// return forecast;
