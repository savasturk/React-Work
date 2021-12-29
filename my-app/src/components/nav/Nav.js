

import React from 'react';
import {AppBar, Toolbar, IconButton, Typography, Button} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';

import { SvgIcon } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#eee',
      
    padding: '0px 30px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [
      theme.breakpoints.up('sm')]: {
        display: 'block',
    },
  },
}));
  
export const Nav = () => {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
    <AppBar position="static">
      <Nav>
   
        <Nav className={classes.root} variant="h6" noWrap>
        Styled with HOC API
        
        </Nav>
        <Nav>
            
          Çalışma Alanı 1
        </Nav>
        <Nav >
          Merhaba, Pınar
        </Nav>
      </Nav>
    </AppBar>
  </div>
  );
}