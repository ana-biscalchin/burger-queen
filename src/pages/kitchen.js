import React, { Fragment } from "react";
import firebase from "../firebaseConfig";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import SimpleCard from "../components/cards";
import Button from "@material-ui/core/Button";
import SimpleAppBar from "../components/navbar";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";

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

  closeOrder = info => {
    database
      .collection("orders")
      .doc(info)
      .update({ status: "close" });
  };

  render() {
    const classes = useStyles;
    return (
      <>
        <SimpleAppBar
          conteudo={
            <>
              <Typography variant="h6" className={classes.title}>
                {" "}
                Olá {this.state.colaborator}, esses são os pedidos em aberto:{" "}
              </Typography>
              <Button onClick={this.logOut}>Sair</Button>
            </>
          }
        />
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          p={4}
          className={classes.paper}
        >
          {this.state.openedOrders.map((item, index) => {
            return (
              <SimpleCard
                key={index}
                content={
                  <div>
                    <Typography color="textSecondary" className={classes.title}>
                      {item.customerName}
                    </Typography>
                    <Typography>
                      {item.order.map((item, index) => {
                        return (
                          <p key={index}>
                            {" "}
                            {item.amount} - {item.name}{" "}
                          </p>
                        );
                      })}
                    </Typography>
                    <CardActions>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => this.closeOrder(item.id)}
                      >
                        {" "}
                        Fechar{" "}
                      </Button>
                    </CardActions>
                  </div>
                }
              />
            );
          })}
        </Box>
      </>
    );
  }
}

export default KitchenControl;
