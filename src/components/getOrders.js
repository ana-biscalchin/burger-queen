export default getOrders = (request) => {
  database
    .collection("orders")
    .where("status", "==", request)
    .onSnapshot(querySnapshot => {
      let cardData = [];
      querySnapshot.forEach(doc => {
        let obj = Object.assign({}, doc.data(), { id: doc.id });
        cardData.push(obj);
      });
    });
};


