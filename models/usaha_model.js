const {
  getDocs, doc, getDoc, addDoc, updateDoc,
} = require('firebase/firestore/lite');
const Model = require('./model');

class Usaha extends Model {
  constructor() {
    super('usaha');
  }

  // override getAll and get users data
  async getAll() {
    const snapshot = await getDocs(this.collectionRef);
    const items = await Promise.all(
      snapshot.docs.map(async (document) => {
        const data = document.data();
        const {
          user, user_id, financials, ...restData
        } = data;

        let userData = null;
        const userId = data.user ? data.user.id : null;
        if (userId) {
          const userSnapshot = await getDoc(doc(this.db, 'users', userId));
          if (userSnapshot.exists()) {
            userData = userSnapshot.data();
          }
        }

        return {
          id: document.id,
          user: userData,
          ...restData,
        };
      }),
    );
    if (items.length > 0) return items;
    return null;
  }

  async findById(id) {
    const snapshot = await getDoc(doc(this.db, this.collectionName, id));
    if (snapshot.exists()) {
      const data = snapshot.data();
      const {
        user, user_id, financials, ...restData
      } = data;

      let userData = null;
      const userId = data.user ? data.user.id : null;
      if (userId) {
        const userSnapshot = await getDoc(doc(this.db, 'users', userId));
        if (userSnapshot.exists()) {
          userData = userSnapshot.data();
        }
      }

      const financialsArray = financials || [];
      const financialsData = await Promise.all(
        financialsArray.map(async (financial) => {
          const financialSnapshot = await getDoc(
            doc(this.db, 'financials', financial.id),
          );
          if (financialSnapshot.exists()) {
            return { id: financialSnapshot.id, ...financialSnapshot.data() };
          }
          return null;
        }),
      );

      return {
        id: snapshot.id,
        user: userData,
        financials: financialsData,
        ...restData,
      };
    }
    return null;
  }

  async add(body) {
    const userRef = doc(this.db, 'users', body.user_id);
    const { user_id, ...restBody } = body;
    const docRef = await addDoc(this.collectionRef, {
      user: userRef, balance: 0, logo_path: 'logo.jpg', total_pengeluaran: 0, total_pemasukan: 0, ...restBody,
    });
    const { id } = docRef;
    const updatedDocRef = await updateDoc(doc(this.db, this.collectionName, id), {
      id,
      ...body,
    });
    const item = await this.findById(id);
    return item;
  }
}
module.exports = new Usaha();
