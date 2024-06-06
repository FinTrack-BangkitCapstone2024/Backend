const { getDocs, doc, getDoc } = require("firebase/firestore/lite");
const Model = require("./model");

class Usaha extends Model {
  constructor() {
    super("usaha");
  }

  // override getAll and get users data
  async getAll() {
    const snapshot = await getDocs(this.collectionRef);
    const items = await Promise.all(
      snapshot.docs.map(async (document) => {
        const data = document.data();
        const { user, user_id, financials, ...restData } = data;

        let userData = null;
        const userId = data.user ? data.user.id : null;
        if (userId) {
          const userSnapshot = await getDoc(doc(this.db, "users", userId));
          if (userSnapshot.exists()) {
            userData = userSnapshot.data();
          }
        }

        const financialsArray = financials ? financials : [];
        const financialsData = await Promise.all(
          financialsArray.map(async (financial) => {
            const financialSnapshot = await getDoc(
              doc(this.db, "financials", financial.id)
            );
            if (financialSnapshot.exists()) {
              return { id: financialSnapshot.id, ...financialSnapshot.data() };
            }
            return null;
          })
        );
        
        return {
          id: document.id,
          user: userData,
          financials: financialsData,
          ...restData,
        };
      })
    );
    if (items.length > 0) return items;
    return [];
  }
}

module.exports = new Usaha();
