import React, {useState} from 'react';
import {AppBar, Toolbar, IconButton, Typography, Button} from '@material-ui/core';import {  makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
	bottomType: {
	  backgroundColor: green,
	},
	rootType: {
		
		backgroundColor: "#cccccc"
	  } 
  }));

const Bottom = (props) => {
	const classes = useStyles();
	return(
		<div>
		<Typography className={classes.rootType} variant="h6" noWrap >
				ENERJİ PİYASALARI İŞLETME A.Ş.

				V.1.0
				
			</Typography>
			
			</div>
	);
}

export default Bottom;