import React from 'react';
import {AppBar, Toolbar, IconButton, Typography, Button} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import logoImage from '../../logo.jpg'

import { SvgIcon } from '@material-ui/core';
  
import  logoNew  from '../../logo.jpg';
import { FaBeer } from 'react-icons/fa';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
  
export const Toolbarnav = () => {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
   
        <Toolbarnav className={classes.title} variant="h6" noWrap>
          EPİAŞ
        
        </Toolbarnav>
        <Toolbarnav>
            <SvgIcon/>
            <logoNew/>
          Çalışma Alanı 1
        </Toolbarnav>
        <Toolbarnav >
        <SvgIcon/>
          Merhaba, Pınar
        </Toolbarnav>
      </Toolbar>
    </AppBar>
  </div>
  );
}