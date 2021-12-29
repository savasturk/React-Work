import Split from 'react-split'
import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import RightBottom from '../RightBottom/RightBottom';
import { TableLayout } from '../TableLayout/TableLayout';



  const useStyles = makeStyles(_theme => ({
    mainArea: {
      flexGrow: 1,
      flexShrink: 1,
      height: "100%",
      minHeight: 0,
      minWidth: 0,
      background: "white",
      transition: "height 0.25s ease-out"
    },
     mainAreaRight: {
      flexGrow: 1,
      flexShrink: 1,
      height: "100%",
      minHeight: 0,
      minWidth: 0,
      background: "white",
      transition: "height 0.25s ease-out"
    },
    bottomArea: {
      overflow: "auto",
      transition: "height 0.25s ease-out",
      background: "white"
    },
    bottomAreaRight: {
      overflow: "auto",
      transition: "height 0.25s ease-out",
      background: "white"
    },
    mainAreaWrapper: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      transition: "height 0.25s ease-out"
    },
    sidebar: {
      maxHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      transition: "width 0.25s ease-out",
      background: "green"
    },
    wrapper: {
      height: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap"
    },

  }));

  


export const Editor = (props) =>{

  const classes = useStyles();

  const [max, setMax] = useState(false);
  
    return (
        
      <Split
      sizes={max ? [100, 0] : [70, 30]}
      minSize={[300, 0]}
      gutterSize={max ? 0 : 10}
      direction="horizontal"
      className={classes.mainAreaWrapper}
    >
      <Split
        sizes={max ? [100, 0] : [80, 20]}
        minSize={max ? [300, 0] : [300, 200]}
        direction="vertical"
        gutterSize={max ? 0 : 10}
        className={classes.wrapper}
      >
        
        <div className={classes.mainArea}>
       <TableLayout>
		   
	   </TableLayout>
        </div>
        <div className={classes.bottomArea} />
      </Split>
      <Split
        sizes={max ? [100, 0] : [80, 20]}
        minSize={max ? [300, 0] : [300, 200]}
        direction="vertical"
        gutterSize={max ? 0 : 10}
        className={classes.wrapper}
      >
        
        <div className={classes.mainAreaRight} />
        <div className={classes.bottomAreaRight}>
			<RightBottom>

			</RightBottom>
          {props.children}
        </div>
      </Split>
    </Split>
      );
};

