import React from 'react';
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
 
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

function KitchenControl() {
    // const classes = useStyles();
    // const theme = useTheme();
    // const [value, setValue] = React.useState(0);
  
    // function handleChange(event, newValue) {
    //   setValue(newValue);
    // }
  
    // function handleChangeIndex(index) {
    //   setValue(index);
    // }
  
    return (
        <div> 
        <p>
        Cozinha</p>
</div>

    //   <div className={classes.root}  >

        // <Container component="main" maxWidth="xs">
        //   <AppBar position="static" color="default" >
        //     <Tabs
        //       value={value}
        //       onChange={handleChange}
        //       indicatorColor="primary"
        //       textColor="primary"
        //       variant="fullWidth"
  
        //     >
        //       <Tab label="Cadastro" />
        //       <Tab label="Login" />
        //     </Tabs>
        //   </AppBar>
        //   <SwipeableViews
        //     axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        //     index={value}
        //     onChangeIndex={handleChangeIndex}
        //   >
        //     <TabContainer dir={theme.direction}><Register /></TabContainer>
        //     <TabContainer dir={theme.direction}><Login /></TabContainer>
        //   </SwipeableViews>
        // </Container>
    //   </div>
  
    );
  }
  
  export default KitchenControl;


