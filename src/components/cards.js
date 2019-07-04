import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles({
  card: {
    maxWidth: 300,
    margin: 4,
    padding: 2
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default function SimpleCard({ content }) {
  const classes = useStyles();

  return <Card className={classes.card}>{content}</Card>;
}
