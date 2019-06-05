import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// import firebase from './src/firebaseConfig';
// eslint-disable-next-line
// const database = firebase.firestore();


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
    width: '100%', // Fix IE 11 issue.
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
      name: "",
      password: "",
      listItem: []
    };
  }
  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState)
  }
  handleClick = (event) => {
    this.setState({
      listItem: this.state.listItem.concat({
        email: this.state.email,
        password: this.state.password
      }),
    })
  };

  render() {
    const { name, password, listItem  } = this.state
    const classes = useStyles;

    return (

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              value={name}
              onChange={(e) => this.handleChange(e, "name")}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nome"
              name="name"
              autoFocus
            />
            <TextField
              value={password}
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
            <FormControlLabel
              control={<Checkbox value="salao" color="primary" />}
              label="Salão"

            />
            <FormControlLabel
              control={<Checkbox value="cozinha" color="primary" />}
              label="Cozinha"
              

            />
            <Button
              type="submit"
              onClick={this.handleClick}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              {
                ...listItem.map(item => {
                  return <p key={item.email}>{item.email} | {item.password}</p>
                })
              }
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
}}

export default Login;