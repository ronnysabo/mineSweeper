import React from "react";
import Cell from "./Cell";
import createBoard from "./utils";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: createBoard(25, 7),
      wonGame: false,
      lostGame: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.resetBoard = this.resetBoard.bind(this);
  }

  handleClick(index) {
    if (this.state.lostGame) {
      return;
    }
    const newBoard = [...this.state.board];
    newBoard[index].visible = true;
    this.setState({ board: newBoard });
    console.log(this.state.board);
    if (newBoard[index].hasMine) {
      this.setState({ lostGame: true });
    }
    this.wonGame();
  }

  resetBoard() {
    this.setState({
      board: createBoard(25, 7),
      wonGame: false,
      lostGame: false,
    });
  }

  wonGame() {
    //filter every cell that has not a mine.
    const fullBoard = this.state.board.filter((cell) => !cell.hasMine);
    //if all cells are visible, wonGame will be true!
    if (fullBoard.every((cell) => cell.visible)) {
      this.setState({ wonGame: true });
    }
  }

  render() {
    return (
      <div>
        <h2 className="d-flex align-items-center justify-content-center">
          MineSweeper
        </h2>
        <div className="board">
          {this.state.board.map((cell, index) => {
            return (
              <Cell
                cell={cell}
                //if state lostGame is true
                onClick={this.handleClick}
                key={index}
              />
            );
          })}
        </div>

        {this.state.wonGame && (
          <div className="wonLost">
            <span className="text-uppercase fw-bolder text-success">
              Du vann!!!
            </span>
            <button className="btn btn-secondary m-3" onClick={this.resetBoard}>
              Starta om
            </button>
          </div>
        )}
        {this.state.lostGame && (
          <div className="wonLost">
            <span className="text-uppercase fw-bolder text-danger">
              Game Over!!!
            </span>
            <button className="btn btn-secondary m-3" onClick={this.resetBoard}>
              Starta om
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Board;
