import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Box from '@material-ui/core/Box';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';


import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();
const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      local: "",
    };
  };

 
  createUser = () => {
    const object = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      local: this.state.local
    }
    this.props.createUserWithEmailAndPassword(
      this.state.email,
      this.state.password,
    ) 
      .then(() => {
        console.log(object)
        database.collection('team').doc(this.props.user.uid).set(object);
        alert("criado")
      })
      .then(() => {
        console.log(object.local)
          this.props.history.push(`/${object.local}`)
      })
      .catch((error) => {
        let errorMessage = error.message;
        alert(errorMessage);
      });
  };

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState)
   }

  render() {
    const classes = useStyles;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              value={this.state.name}
              onChange={(e) => this.handleChange(e, "name")}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nome"
              name="register-name"
              autoFocus
            />
            <TextField
              value={this.state.email}
              onChange={(e) => this.handleChange(e, "email")}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              type="email"
              id="register-email"
            />
            <TextField
              value={this.state.password}
              onChange={(e) => this.handleChange(e, "password")}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="register-password"
            />
            <Box>
              <RadioGroup onChange={(e) => this.handleChange(e, "local")}>
                <FormControlLabel
                  value="hall"
                  control={<Radio color="primary" />}
                  label="Salão"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="kitchen"
                  control={<Radio color="primary" />}
                  label="Cozinha"
                  labelPlacement="end"
                />
              </RadioGroup>
            </Box>
            <Button
              onClick={this.createUser}
              text="Entrar"
              fullWidth
              variant="contained"
              color="primary"
            >
              Cadastrar
             </Button>
          </form>
        </div >
      </Container >
    );
  };
}

export default compose(
  withFirebaseAuth({
    firebaseAppAuth,
  }),
  withRouter,
)(Register);
