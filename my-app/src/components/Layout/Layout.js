import { default as SplitGrid } from 'react-split-grid'
import React, { useEffect, useState } from "react";


export const Layout = () =>{

  /*const [columns, setColumns] = useState(`3fr 10px 3fr 10px 1fr`);

  const handleDrag = (direction, track, gridTemplateStyle) => {
    setColumns(gridTemplateStyle);
  };
  */
  return (
    <SplitGrid
          // minSize={5}
          // columnMinSize={200}
          // columnMinSizes={[1,2,3]}
          columnCursor="col-resize"
          rowCursor="row-resize"
          render={({ getGridProps, getGutterProps }) => {
            return (
              <div className={"grid-container"} {...getGridProps()}>




                <div className={"grid-item item1"}>Column One</div>
                <div
                  className={"grid-gutter item2 gutter-horizontal"}
                  {...getGutterProps("column", 1)}
                />
                <div className={"grid-item item3"}>Column Two</div>
                <div
                  className={"grid-gutter item4 gutter-horizontal"}
                  {...getGutterProps("column", 3)}
                />
                <div
                  className={"grid-gutter item6 gutter-vertical"}
                  {...getGutterProps("row", 1)}
                />
                <div className={"grid-item item7"}>Row Two</div>


              </div>
            );
          }}
        />
);
};
