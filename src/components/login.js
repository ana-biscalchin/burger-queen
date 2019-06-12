import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  signIn = () => {
    this.props.signInWithEmailAndPassword(
      this.state.email,
      this.state.password,
    )

    database.collection('funcionarios').doc(this.props.user.uid).get()
    .then(function(doc) {
    if (doc.exists) {
        let a = doc.data().local;
     console.log(a)
    this.props.history.push(`/${doc.data().local}`)


    } 
    else {
        console.log("No such document!");
    }
  })
}


handleChange = (event, element) => {
  const newState = this.state;
  newState[element] = event.target.value
  this.setState(newState)
};

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
            onChange={(e) => this.handleChange(e, "email")}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoFocus
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
            id="password"
            autoComplete="current-password"
          />
          <Button
            onClick={this.signIn}
            text="Entrar"
            fullWidth
            variant="contained"
            color="primary"
          >
            Entrar
               </Button>
          <Grid container>
            <Grid item md>
              <Link href="#" variant="body2">
                Esqueceu a senha?
                </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Cadastre-se"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

    </Container >
  );
};
}

export default compose(
  withFirebaseAuth({
    firebaseAppAuth,
  }),
  withRouter,
)(Login);