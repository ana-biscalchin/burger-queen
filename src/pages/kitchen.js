import React from "react";
import firebase from "../firebaseConfig";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    
  }
}));

const database = firebase.firestore();
const firebaseAppAuth = firebase.auth();

class KitchenControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colaborator: "",
      customerName: "",
      ordersOpened: [],
      status: ""
    };
    firebaseAppAuth.onAuthStateChanged(user => {
      if (user) {
        database
          .collection("team")
          .doc(user.uid)
          .get()
          .then(doc => {
            console.log(doc.data().name);
            this.setState({ colaborator: doc.data().name });
          });
      } else {
        console.log(" No user is signed in.");
      }
    });
    this.getOrders();
  }

  logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.history.push(`/`);
      });
  };

  getOrders = () => {
    const receive = database.collection("orders").where("status", "==", "open");
    receive.get().then(querySnapshot => {
      if (querySnapshot.docs.length > 0) {
        let orders = [];
        querySnapshot.forEach(function(doc) {
          orders.push(doc.data());
        });
        this.setState({
          ordersOpened: orders
        });
        console.log(this.state.ordersOpened);
      }
    });
  };

  render() {
    const classes = useStyles;
    const theme = useTheme;
    return (
      <div>
      <Paper className={classes.paper}> Olá {this.state.colaborator}, esses são os pedidos em aberto:
        <Button onClick={this.logOut}>Sair</Button>
      </Paper>
      <Paper className={classes.paper}> {  
        this.state.ordersOpened.map(order => {
          return (
            <Card key={order.orderNumber}> 
              {order.customerName}
              {order.order.map((item, index) => {
                return (
                <p key={index}> {item.name}</p>
                )
              })}
              <Button > {order.status} </Button>
            </Card>
          )
        })
      } </Paper>
      </div>
    )
  }
}  

export default KitchenControl


