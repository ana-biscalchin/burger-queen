import React from "react";
import firebase from "../firebaseConfig";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
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
      openedOrders: [],
      status: "",
      closeTime: ""
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
    this.getOpenOrders();
  }

  logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.history.push(`/`);
      });
  };

  getOpenOrders = () => {
    database
      .collection("orders")
      .where("status", "==", "open")
      .onSnapshot(querySnapshot => {
        let cardData = [];
        querySnapshot.forEach(doc => {
          let obj = Object.assign({}, doc.data(), { id: doc.id });
          cardData.push(obj);
        });
        console.log(cardData);
        this.setState({
          openedOrders: cardData
        });
      });
  };

  closeOrder = (info) => {
    database
      .collection("orders")
      .doc(info)
      .update({ status: "close" });
  };

  render() {
    const classes = useStyles;
    const theme = useTheme;
    return (
      <div>
        <Paper className={classes.paper}>
          {" "}
          Olá {this.state.colaborator}, esses são os pedidos em aberto:
          <Button onClick={this.logOut}>Sair</Button>
        </Paper>
        <Paper className={classes.paper}>
          {this.state.openedOrders.map((item, index) => {
            return (
              <Card key={index}>
                {item.customerName}
                {item.order.map((item, index) => {
                  return <p key={index}> {item.name}</p>;
                })}
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => this.closeOrder(item.id)}
                >
                  {" "}
                  Aberto{" "}
                </Button>
              </Card>
            );
          })}
        </Paper>
      </div>
    );
  }
}

export default KitchenControl;
