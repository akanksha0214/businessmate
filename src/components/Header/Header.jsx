import React from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@mui/material';
import { FcBusinessman } from "react-icons/fc";

import useStyles from './style';

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position='fixed' className={classes.bar} style={{ backgroundColor: 'purple' }}>
      <Toolbar className={classes.toolbar}>
        <FcBusinessman size={30} />
        <Typography variant='h5' className={classes.title} style={{ fontFamily: 'cursive' }}>
          &nbsp; Find Businesses around you
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header;