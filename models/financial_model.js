const Model = require("./model");
const { getDocs, doc, getDoc, addDoc, updateDoc } = require("firebase/firestore/lite");

class Financial extends Model {
  constructor() {
    super("financials");
  }

  namingDate(number) {
    switch (number) {
      case 0:
        return "Sun";
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
      default:
        return "Not Found";
    }
  }

  async getWeeklyFinancial() {
    
    var now = new Date();
    var utc = now.getTime()
    var wibOffset = 420;

    var wib = utc + (wibOffset * 60000)

    const maximumDay = new Date( wib);
    const minimumDay = new Date(wib);

    minimumDay.setDate(maximumDay.getDate() - 7);
  
    const snapshot = await getDocs(this.collectionRef);
    const items = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    const weeklyMasukan = [0,0,0,0,0,0,0]
    const weeklyKeluaran = [0,0,0,0,0,0,0]
    console.log("items");
    console.log(items);
    items.forEach(item => {
      console.log("Date");
      const itemDate = new Date(new Date(item.tanggal).getTime() + (wibOffset * 60000)) ;
      const index = (maximumDay.getDate() - itemDate.getDate()); 
      console.log(index);
      if(index >= 0){
        if( item.tipe == "pengeluaran"){
          weeklyKeluaran[index] += parseInt(item.jumlah);
        }
        if( item.tipe == "masukan"){
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
    return {day: hari.reverse(), masukan : weeklyMasukan.reverse(), pengeluaran : weeklyKeluaran.reverse()};
  }
}

module.exports = new Financial();
