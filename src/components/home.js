import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Register from "./register";
import Login from "./login";
import FullWidthTabs from "./tabs";
import { TabContainer } from "./tabs";

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
            <Register />
          </TabContainer>
          <TabContainer value={1} dir={theme.direction}>
            <Login history={props.history} />
          </TabContainer>
        </FullWidthTabs>
      </Container>
    </div>
  );
}

export default Home;
