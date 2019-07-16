import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import logo from "../images/logo.png";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  root: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "space-between"
  },
  imgLogo: {
    marginRight: 50
  }
});

export default function SimpleAppBar({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar className={classes.root}>
          <img
            src={logo}
            alt="logo hamburguer"
            width={70}
            className={classes.imgLogo}
          />
          {children[0]}

          {children[1]}
        </Toolbar>
      </AppBar>
    </div>
  );
}
