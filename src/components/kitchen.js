import React from 'react';
import PropTypes from "prop-types";
// import { makeStyles, useTheme } from "@material-ui/core/styles";
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

// const useStyles = makeStyles(theme => ({
//   root: {
//     backgroundColor: theme.palette.background.paper,
//     flexGrow: 2,
//   }
// }));

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
  
    );
  }
  
  export default KitchenControl;


