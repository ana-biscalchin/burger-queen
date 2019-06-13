import React from 'react';
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';

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
]

function signOut() {
  firebase.auth().signOut()
  .then(function () {
    this.props.history.push('/');
  })
    .catch(function () {
      console.log("Você ainda está logado");
    });
}

// componentDidMount() {
//   firebase.auth().onAuthStateChanged(function (user) {
//     if (user) {
//       console.log('logado');
//     } else {
//       console.log("User is signed out.");
//     }
//   });

// }

function MenuTabs() {


  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  // function handleChangeIndex(index) {
  //   setValue(index);
  // }

  function selectItem(product) {
    console.log(product)
  }

  return (
    <div className={classes.root}  >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>cliente:   <button onClick={() => signOut()}>Log Out</button></Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}><AppBar position="static" color="default">
            <Tabs value={value} onChange={handleChange} variant="fullWidth" indicatorColor="primary">
              <Tab label="Café da manhã" />
              <Tab label="Geral" />
            </Tabs>
          </AppBar>
            {value === 0 && <TabContainer dir={theme.direction}> {
              product.map((product, i) => {
                if (product.menu === "manhã") {
                  return <button value="" onClick={() => selectItem(product)}> {product.name}<br></br>{product.price} </button>
                }
              })
            }
            </TabContainer>}
            {value === 1 && <TabContainer dir={theme.direction}> {
              product.map((product, i) => {
                if (product.menu === "dia") {
                  return <button value=" " onClick={() => selectItem(product)} > {product.name}<br></br>{product.price} </button>
                }
              })
            }
            </TabContainer>}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>Pedido
          <Paper className={classes.paper}>
              <br></br>
              <br></br>
              <br></br>
            </Paper>
            <button> Enviar </button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}


export default MenuTabs;


