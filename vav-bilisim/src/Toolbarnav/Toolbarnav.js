import {AppBar, Toolbar, IconButton, Typography, Button} from '@material-ui/core';import {  makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

import { SvgIcon } from '@material-ui/core';
  
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
  
export const Toolbarnav = (props) => {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
    <AppBar position="static">
		<Toolbar>
		
			<Typography className={classes.title} variant="h6" noWrap>
            EPİAŞ
          </Typography>

		<div >
			Çalışma Alanı 1 
		</div>
		<div>

		</div>
		<div>
			Merhaba, Pınar
		</div>


		</Toolbar>
      
    </AppBar>
	{props.children}
  </div>
  );
}
export default Toolbarnav;