import React from "react";
import firebase from "../firebaseConfig";
import FullWidthTabs from "../components/tabs";
import { TabContainer } from "../components/tabs";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DeleteIcon from "@material-ui/icons/Delete";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SimpleModal from "../components/modal";
import Card from "@material-ui/core/Card";


const database = firebase.firestore();
const firebaseAppAuth = firebase.auth();

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  }
}));

const product = [
  {
    name: "CAFÉ AMERICANO",
    price: 5,
    menu: "breakfest"
  },
  {
    name: "CAFÉ COM LEITE",
    price: 7,
    menu: "breakfest"
  },
  {
    name: "SANDUÍCHE DE PRESUNTO E QUEIJO",
    price: 10,
    menu: "breakfest"
  },
  {
    name: "SUCO DE FRUTA NATURAL",
    price: 7,
    menu: "breakfest"
  },
  {
    name: "HAMBÚRGUER SIMPLES",
    price: 10,
    menu: "day"
  },
  {
    name: "HAMBÚRGUER DUPLO",
    price: 15,
    menu: "day"
  },
  {
    name: "BATATA FRITA",
    price: 5,
    menu: "day"
  },
  {
    name: "ANÉIS DE CEBOLA",
    price: 5,
    menu: "day"
  },
  {
    name: "ÁGUA 500ml",
    price: 5,
    menu: "day"
  },
  {
    name: "ÁGUA 750ml",
    price: 7,
    menu: "day"
  },
  {
    name: "BEBIDA GASEIFICADA 500ml	",
    price: 7,
    menu: "day"
  },
  {
    name: "BEBIDA GASEIFICADA 750ml",
    price: 10,
    menu: "day"
  }
];

class Hall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colaborator: "",
      customerName: "",
      closedOrders: [], 
      order: [],
      status: "open",
      openTime: firebase.firestore.FieldValue.serverTimestamp()
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

   this.getClosedOrders()
  }

  logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.history.push(`/`);
      });
  };

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value;
    this.setState(newState);
  };

  selectItem = item => {
    const itemIndex = this.state.order.findIndex(product => {
      return product.name === item.name;
    });
    if (itemIndex < 0) {
      const newItem = {
        ...item,
        amount: 1
      };
      this.setState({
        order: this.state.order.concat(newItem)
      });
    } else {
      let addItem = this.state.order;
      addItem[itemIndex].amount += 1;
      this.setState({
        order: addItem
      });
      console.log(this.state.order);
    }
  };

  deleteItem = item => {
    const itemIndex = this.state.order.findIndex(product => {
      return product.name === item.name;
    });
    let removeItem = this.state.order;
    removeItem[itemIndex].amount -= 1;
    const amount = removeItem[itemIndex].amount;
    if (amount > 0) {
      this.setState({
        order: removeItem
      });
    } else {
      removeItem.splice(itemIndex, 1);
      this.setState({
        order: removeItem
      });
    }
  };

  sendOrder = () => {
    const {
      colaborator,
      customerName,
      order,
      status,
      openTime
    } = this.state;
    const finalOrder = {
      colaborator,
      customerName,
      order,
      status,
      openTime
    };
    database.collection("orders").add(finalOrder);
    this.setState({
      order: [],
      customerName: "",
      time: ""
    });

    alert("Pedido enviado");
  };

  getClosedOrders = () => {
    database
      .collection("orders")
      .where("status", "==", "close")
      .onSnapshot((querySnapshot) =>  { 
        let cardData = [];
        querySnapshot.forEach(doc => { 
          let obj = Object.assign({}, doc.data(), { id: doc.id });
          cardData.push(obj);
        });
        console.log(cardData);
        this.setState({
          closedOrders: cardData
        });
      });
  };

  concludeOrder = (info) => {
    database
      .collection("orders")
      .doc(info)
      .update({ status: "conclude" });
  };

  render() {
    const classes = useStyles;
    const theme = useTheme;
    const totalPrice = this.state.order.reduce((acc, cur) => {
      return acc + cur.amount * cur.price;
    }, 0);
    
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              {this.state.colaborator}
              <TextField
                type="text"
                value={this.state.customerName}
                placeholder="Digite o nome do cliente"
                onChange={e => this.handleChange(e, "customerName")}
              />
              <Button onClick={this.logOut}>Sair</Button>{" "}
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper classNersame={classes.paper}>
              <FullWidthTabs titles={["DIÁRIO", "MANHÃ"]}>
                <TabContainer value={1} dir={theme.direction}>
                  {" "}
                  {product.map((product, i) => {
                    if (
                      (product.menu === "day" &&
                        product.name === "HAMBÚRGUER DUPLO") ||
                      product.name === "HAMBÚRGUER SIMPLES"
                    ) {
                      return (
                        <Button
                          variant="contained"
                          onClick={() => this.selectItem(product)}
                        >
                          {product.name}
                          <br />
                          {product.price} <SimpleModal />
                        </Button>
                      );
                    }
                    if (product.menu === "day") {
                      return (
                        <Button
                          key={i}
                          variant="contained"
                          onClick={() => this.selectItem(product)}
                        >
                          {product.name}
                          <br />
                          {product.price}{" "}
                        </Button>
                      );
                    }
                  })}
                </TabContainer>
                <TabContainer value={0} dir={theme.direction}>
                  {" "}
                  {product.map((product, i) => {
                    if (product.menu === "breakfest") {
                      return (
                        <Button
                          key={i}
                          variant="contained"
                          onClick={() => this.selectItem(product)}
                        >
                          {product.name}
                          <br />
                          R${product.price}
                        </Button>
                      );
                    }
                  })}
                </TabContainer>
              </FullWidthTabs>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography variant="h6" className={classes.title}>
                {<> {this.state.customerName}</>}
              </Typography>
            </Paper>
            <Paper className={classes.paper}>
              <List>
                {" "}
                {this.state.order.map((product, i) => {
                  return (
                    <ListItem key={i}>
                      <ListItemIcon>
                        <DeleteIcon onClick={() => this.deleteItem(product)} />
                      </ListItemIcon>
                      <ListItemText>
                        {" "}
                        {product.amount} - {product.name} -{" "}
                        {`R$ ${product.price},00`} - Total
                      </ListItemText>
                    </ListItem>
                  );
                })}
              </List>
              <Typography variant="h6" className={classes.title}>
                R$ {totalPrice}{" "}
              </Typography>
            </Paper>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.sendOrder}
            >
              {" "}
              Enviar
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6" className={classes.title}>
            </Typography>  
            {this.state.closedOrders.map((item, index) => {
            return (
              <Card key={index} >
                {item.customerName}
                {item.order.map((item, index) => {
                  return <p key={index}> {item.name}</p>;
                })}
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => this.concludeOrder(item.id)}
                >
                  {" "}
                  Entregue{" "}
                </Button>
              </Card>
            );
          })}
          </Paper>
        </Grid>
      </div>
    );
  }
}

export default Hall;
