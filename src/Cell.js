import React from "react";
import "./Cell.css";

function Cell({ flipCellsAround, isLit, coord }) {
  const classes = `Cell ${isLit ? "Cell-lit" : ""}`;
  return <td className={classes} coord={coord} onClick={()=>flipCellsAround(coord)}/>;
}

export default Cell;
