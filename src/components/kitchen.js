import React from 'react';
import firebase from '../firebaseConfig'

const database = firebase.firestore();
const firebaseAppAuth = firebase.auth();

class KitchenControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
  
      colaborator: "",
      customerName: "",
      order: [],
      status: ""
    }
    firebaseAppAuth.onAuthStateChanged((user) => {
      if (user) {
        database.collection("team").doc(user.uid).get()
          .then((doc) => {
            console.log(doc.data().name)
            this.setState({ colaborator: doc.data().name });
          })
      }
      else {
        console.log(" No user is signed in.")
      }
    })
  };

  la = () => {
    database.collection("orders").where("status", "==", "open")
    .onSnapshot(function(querySnapshot) {
      let openOrder = [];
      querySnapshot.forEach(function(doc) {
        openOrder.push(doc.data())
        console.log(openOrder);
      })
    });
  }

  pub = ( ) => {

    this.status.openOrder.map((item, i) => {
      console.log(item.customerName)
      return item.customerName 
    })

  }


  render() {


  this.la()

    return (

    <div>
       {this.state.colaborator}

       <span> {this.pub }
      </span>
      
    </div>

    )
  }

}

export default KitchenControl;


