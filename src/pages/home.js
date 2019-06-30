import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Register from "../components/register";
import Login from "../components/login";
import FullWidthTabs from "../components/tabs";
import { TabContainer } from "../components/tabs";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 2
  }
}));

function Home(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <FullWidthTabs titles={["LOGIN", "CADASTRO "]}>
          <TabContainer value={0} dir={theme.direction}>
            <Login history={props.history} />
          </TabContainer>
          <TabContainer value={1} dir={theme.direction}>
            <Register />
          </TabContainer>
        </FullWidthTabs>
      </Container>
    </div>
  );
}

export default Home;
