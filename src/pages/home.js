import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Register from "../components/register";
import Login from "../components/login";
import FullWidthTabs from "../components/tabs";
import { TabContainer } from "../components/tabs";
import Grid from "@material-ui/core/Grid";
import logo from "../images/logo.png";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
    marginTop: 80
  }
}));

function Home(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <Grid container xs={12} direction="row">
        <Grid item xs={6} className={classes.root}>
          <img src={logo} alt="logo hamburguer" />
        </Grid>
        <Grid item xs={6} className={classes.root}>
          <Container spacing="2" component="main" maxWidth="xs">
            <FullWidthTabs titles={["LOGIN", "CADASTRO "]}>
              <TabContainer value={0} dir={theme.direction}>
                <Login history={props.history} />
              </TabContainer>
              <TabContainer value={1} dir={theme.direction}>
                <Register />
              </TabContainer>
            </FullWidthTabs>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
