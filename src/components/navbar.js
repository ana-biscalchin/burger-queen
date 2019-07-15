import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import logo from "../images/logo.png";

const useStyles = makeStyles({
  root: {
     display: "flex",

   }
});

export default function SimpleAppBar({children}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar  position="static" color="default">
        <Toolbar display="flex">
        <img src={logo} alt="logo hamburguer" width={70}  />
        {children}
        </Toolbar>
      </AppBar>
    </div>
  );
}
