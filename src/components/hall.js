import React from 'react';
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
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
    flexGrow: 2,
  }
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

// signOut = () => {
//   firebase.auth().signOut().then(function () {
//     console.log("Sign-out successful");
//   }).then(() => {
//     this.props.history.push('/');
//   })
//     .catch(function (error) {
//       console.log("An error happened");
//     });
// }

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

  function handleChangeIndex(index) {
    setValue(index);
  }

  function selectItem(product) {
   console.log(product)
  } 

  return (
    <div className={classes.root}  >
      <Container component="main" maxWidth="xs">
        <AppBar position="static" color="default" >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Café da Manhã" />
            <Tab label=" Dia" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabContainer dir={theme.direction}> {
            product.map((product, i) => { 
              if (product.menu === "manhã") {
                return <button value=""> {product.name}<br></br>{product.price} </button>
              }
            })            
          }  
          </TabContainer>
          <TabContainer dir={theme.direction}> {
            product.map((product, i) => { 
              if (product.menu === "dia") {
                return <button value=" " onclick={() => selectItem(product) } > {product.name}<br></br>{product.price} </button>
              }
            })            
          }  
          </TabContainer>
        </SwipeableViews>
      </Container>
    </div>
  );
}

export default MenuTabs;


