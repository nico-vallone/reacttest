import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//the 1D array of squares means this is the most 
//efficient way of checking if the game is over
function calculateWinner(squares){
	const winningLines = [
		[0,1,2],//horizontal wins
		[3,4,5],
		[6,7,8],
		[0,3,6],//vertical wins
		[1,4,7],
		[2,5,8],
		[0,4,8],//diagonal wins
		[6,4,2],
	];
	for (let i=0; i < winningLines.length; i++){
		const [a,b,c] = winningLines[i];
		if(squares[a] && 
			squares[a] === squares[b] &&
			squares[a] === squares[c])
			return squares[a];
	}
	return null;
}

//functional component renders thei nformation passed to
//it from the board component props
function Square(props){
  return(
  <button className="square" onClick={props.onClick}>
      {props.value}
  </button>
  );
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null), //having this be 1D breaks my heart
      xIsNext: true,
    };
  }
	
	//creates a copy of the current squares
	//(see immutability), changes the copy, and assigns
	//the current state to the new squares
	//also does nothing if square already clicked or game over
  handleClick(i) {
		const squares = this.state.squares.slice();
		if(calculateWinner(squares) || squares[i]) {
			return;
		}
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
  
  renderSquare(i) {
    return (
      <Square 
        value = {this.state.squares[i]}
        onClick = {() => this.handleClick(i)}/>
    );
  }

  render() {
		const winner = calculateWinner(this.state.squares);
		let status;
		if (winner){
			status = 'Winner ' + winner;
		} else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		} 

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
