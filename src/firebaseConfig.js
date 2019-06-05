import firebase from "firebase";

const config = {

    apiKey: "AIzaSyD8px75QSaNclaid-QeI0trKktx2WsmDNg",
    authDomain: "burger-queen-ana.firebaseapp.com",
    databaseURL: "https://burger-queen-ana.firebaseio.com",
    projectId: "burger-queen-ana",
    storageBucket: "",
    messagingSenderId: "1006326624409",
    appId: "1:1006326624409:web:c4107138afd1bc49"
  };

firebase.initializeApp(config);

export default firebase;