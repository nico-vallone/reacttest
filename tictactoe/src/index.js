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
  
  renderSquare(i) {
    return (
      <Square 
        value = {this.props.squares[i]}
        onClick = {() => this.props.onClick(i)}/>
    );
  }

  render() {
    return (
      <div>
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
	constructor(props){
		super(props);
		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			xIsNext: true,
			stepNumber: 0,
		};
	}

	//creates a copy of the current squares
	//(see immutability), changes the copy, and assigns
	//the current state to the new squares
	//also does nothing if square already clicked or game over
  handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length-1];
		const squares = current.squares.slice();

		if(calculateWinner(squares) || squares[i]) {
			return;
		}

		squares[i] = this.state.xIsNext ? 'X' : 'O';
		
    this.setState({
      history: history.concat([{
				squares: squares,
			}]),
			stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
	}
	
	jumpTo(step){
		this.setState({
			stepNumber: step,
			xIsNext: step % 2 === 0,
		});
	}

  render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);

		//maps history of moves to a list of jump buttons on screen
		const moves = history.map((step, move) => {
			const desc = move ? 
				'Go to move #' + move :
				'Go to game start';
			return (
				<li key={move}>
					<button onClick={() => this.jumpTo(move)}>
						{desc}
					</button>
				</li>
			);
		})

		let status;
		if (winner){
			status = 'Winner: ' + winner;
		} else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}

    return (
      <div className="game">
        <div className="game-board">
					<Board 
						squares = {current.squares}
						onClick = {(i) => this.handleClick(i)}
					/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
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
