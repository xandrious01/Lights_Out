import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

function Board({ nrows, ncols, chanceLightStartsOn }) {
  // const initialBoard = createBoard();
  const [board, setBoard] = useState(createBoard);

  function createBoard() {
    let initialBoard = [];
    const newCell = () => {
      let isLit = Math.random() < chanceLightStartsOn ? true : false;
      return isLit;
    };

    for (let y = 0; y < nrows; y++) {
      let row = [];
      for (let x = 0; x < ncols; x++) {
        row.push(newCell());
      };
      initialBoard.push(row);
    };
    return initialBoard;
  };

  function flipCellsAround(coord) {
    const coordsToFlip = findCoordsToFlip(coord);
    const newBoard = flipCoords(coordsToFlip);
    setBoard(newBoard);
    (hasWon()===true) ? console.log("win") : console.log("no")
  };
  
  function findCoordsToFlip(coord) {
    const [y, x] = coord.split("-").map(Number);
    const calculatedCoords =
      [[y, x],
      [y, (x - 1)],
      [y, (x + 1)],
      [(y + 1), x],
      [(y - 1), x]];

    const coordsToFlip = calculatedCoords.filter(coord => {
      const [y, x] = coord;
      if (y >= 0 && y < nrows && x >= 0 && x < ncols) {
        return coord;
      };
    });
    return coordsToFlip;
  };

  function flipCoords(coordsToFlip) {
    const newBoard = board.map(y => y.map(x => x));
    coordsToFlip.forEach(coord => {
      const [y, x] = coord;
      if (newBoard[y][x] === true) {
        newBoard[y][x] = false;
      } else if (newBoard[y][x] === false) {
        newBoard[y][x] = true;
      };
    });
      return newBoard;
  }
  
  function hasWon(){
    
    const checkForWin = board.every(row => row.every(cell => !cell));
    console.log(checkForWin);
    console.log(board);
    return checkForWin;
  
  }

  const renderedRows = board.map((y, indY) => {
    return y.map((x, indX) => {
      let coord = indY.toString().concat("-", indX.toString());
      return <Cell key={coord} flipCellsAround={flipCellsAround} isLit={x} coord={coord} />
    });
  });

  return (
    <>
      <table className="Board">
        <tbody>
          {renderedRows.map(y => {
            return <tr key={renderedRows.indexOf(y)}>
              {y}
            </tr>
          })}
        </tbody>
      </table>
    </>
  )

}

export default Board;
