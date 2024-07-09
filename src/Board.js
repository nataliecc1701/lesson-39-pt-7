import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=3, ncols=3, chanceLightStartsOn=0.5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    // create array-of-arrays of true/false values
    let initialBoard = [];
    for (let i = 0; i < nrows; i++) {
      const row = [];
      for (let j = 0; j < ncols; j++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    // check the board in state to determine whether the player has won.
    return board.every(row => {
      return row.every((cell) => !cell)
    })
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // Make a (deep) copy of the oldBoard
      const newBoard = board.map(row => [...row])

      // in the copy, flip this cell and the cells around it
      flipCell (y, x,   newBoard);
      flipCell (y+1, x, newBoard);
      flipCell (y-1, x, newBoard);
      flipCell (y, x+1, newBoard);
      flipCell (y, x-1, newBoard);

      // return the copy
      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  if (hasWon()) {
    return <h1 classname="board board-win-msg">You Won!</h1>
  }

  // make table board

  return (<table classname="board board-table">
    {board.map((row, rowIdx) => {return (<tr>
      {row.map((cell, colIdx) => {return (<td>
        <Cell flipCellsAroundMe={() => flipCellsAround(`${rowIdx}-${colIdx}`)} isLit={cell} />
        </td>)})}
    </tr>)})}
  </table>)
}

export default Board;
