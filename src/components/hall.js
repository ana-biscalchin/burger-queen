import React from 'react';
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import firebase from '../firebaseConfig';

const TabContainer = ({ children, dir }) => {
  return (

    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const product = [
  {
    name: "CAFÉ AMERICANO",
    price: 5,
    menu: "manhã"
  },
  {
    name: "CAFÉ COM LEITE",
    price: 7,
    menu: "manhã"
  },
  {
    name: "SANDUÍCHE DE PRESUNTO E QUEIJO",
    price: 10,
    menu: "manhã"
  },
  {
    name: "SUCO DE FRUTA NATURAL",
    price: 7,
    menu: "manhã"
  },
  {
    name: "HAMBÚRGUER SIMPLES",
    price: 10,
    menu: "dia"
  },
  {
    name: "HAMBÚRGUER DUPLO",
    price: 15,
    menu: "dia"
  },
  {
    name: "BATATA FRITA",
    price: 5,
    menu: "dia"
  },
  {
    name: "ANÉIS DE CEBOLA",
    price: 5,
    menu: "dia"
  },
  {
    name: "ÁGUA 500ml",
    price: 5,
    menu: "dia"
  },
  {
    name: "ÁGUA 750ml",
    price: 7,
    menu: "dia"
  },
  {
    name: "BEBIDA GASEIFICADA 500ml	",
    price: 7,
    menu: "dia"
  },
  {
    name: "BEBIDA GASEIFICADA 750ml",
    price: 10,
    menu: "dia"
  }
];

class Hall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colaborator: '',
      order: [],
      customerName: "",
      totalPrice: 0,

    };
  }

  sair = () => {
    firebase.auth().signOut().then(() => {
      this.props.history.push(`/`);
    })
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState)
  };

  selectItem = (product) => {
    this.state.order.push(product)
    console.log(this.state.order.map(({ name }) => ({ name })))
    console.log(this.state.order.map(({ price }) => ({ price })))
  };

  render() {
    const classes = useStyles;
    const theme = useTheme;

    return (
      <div className={classes.root} >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <TextField
                type="text"
                value={this.state.customerName}
                placeholder="Digite o nome do cliente"
                onChange={(e) => this.handleChange(e, "customerName")}
              />
              <Button onClick={this.sair}>LogOut</Button>  </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}><AppBar position="static" color="default">
              <Tabs onChange={this.handleChange} variant="fullWidth" indicatorColor="primary">
                <Tab label="Café da manhã" />
                <Tab label="Geral" />
              </Tabs>
            </AppBar>
              <TabContainer dir={theme.direction}> {
                product.map((product, i) => {
                  if (product.menu === "manhã") {
                    return <button value="" onClick={() => this.selectItem(product)}> {product.name}<br></br>{product.price} </button>
                  }
                })
              }
              </TabContainer>
              <TabContainer dir={theme.direction}> {
                product.map((product, i) => {
                  if (product.menu === "dia") {
                    return <button value="" onClick={() => this.selectItem(product)} > {product.name}<br></br>{product.price} </button>
                  }
                })
              }
              </TabContainer>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>Pedido
            <Paper className={classes.paper}> {
                this.state.order.map((product, i) => {
                  return <div key={i}> <span>{product} - {product}</span> </div>  // ainda não funciona
                })
              }
             </Paper>
              <button> Enviar </button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  };
}

export default Hall;


