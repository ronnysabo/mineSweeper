import React from "react";
import "./index.css";

function Cell(props) {
  function cellClick() {
    props.onClick(props.cell.index);
  }

  const cell = props.cell;
  let cellContent = cell.visible
    ? cell.hasMine
      ? "💣"
      : cell.numberOfNeighbouringMines || 0
    : "";

  return (
    <div className="gameBoard" onClick={cellClick}>
      {cellContent}
    </div>
  );
}

export default Cell;
