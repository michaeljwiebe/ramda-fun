import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import equals from 'rambda/src/equals';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width': '60px',
  'height': '60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '120px',
  'height': '40px',
  'backgroundColor': 'red',
  'color': 'white',
  'fontSize': '16px',
}

const disableClick = {
  'pointerEvents': 'none'
}

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    }
    this.clicked = this.clicked.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  componentDidMount() {
    this.setState({ clicked: false });
  }

  setValue = () => {
    if (this.props.value === undefined) {
      return '';
    } else {
      return this.props.value;
    }
  }

  clicked = () => {
    if (this.props.value === null) {
      this.props.addClick(this.props.index);
    }
  }

  render() {
    return (
      <div
        className="square"
        style={squareStyle}
        onClick={this.clicked}
      >
        {this.setValue()}
      </div>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickCount: 0,
      zero: null,
      one: null,
      two: null,
      three: null,
      four: null,
      five: null,
      six: null,
      seven: null,
      eight: null,
      winner: 'None'
    }
    this.addClick = this.addClick.bind(this);
    this.reset = this.reset.bind(this);
    this.checkForWinner = this.checkForWinner.bind(this);
    this.checkPossibleWin = this.checkPossibleWin.bind(this);
  }

  addClick = (idx) => {
    var obj = {};
    obj[idx] = this.state.clickCount % 2 === 0 ? 'X' : 'O';
    this.setState({ clickCount: this.state.clickCount + 1, ...obj }, () => {
      this.checkForWinner();
    })
  }

  checkPossibleWin = (array) => {
    return equals[array] ? array[0] : false;
  }

  checkForWinner = () => {
    const { zero, one, two, three, four, five, six, seven, eight } = this.state;
    const allPossibilities = [
      this.checkPossibleWin([zero, one, two]),
      this.checkPossibleWin([three, four, five]),
      this.checkPossibleWin([six, seven, eight]),
      this.checkPossibleWin([zero, three, six]),
      this.checkPossibleWin([one, four, seven]),
      this.checkPossibleWin([two, five, eight]),
      this.checkPossibleWin([zero, four, eight]),
      this.checkPossibleWin([six, four, two])
    ]
    const winner = allPossibilities.filter(val => Boolean(val) ? val : false);
    if (winner[0]) {
      this.setState({ winner: winner[0] });
    }
  }

  reset = () => {
    this.setState({
      clickCount: 0,
      zero: null,
      one: null,
      two: null,
      three: null,
      four: null,
      five: null,
      six: null,
      seven: null,
      eight: null
    });
  }

  render() {
    console.log('this.state', this.state);
    var gameRestarted = this.state.winner !== 'None' && this.state.clickCount === 0;
    var gameOver = this.state.winner !== 'None' && this.state.clickCount > 0;

    return (
      <div style={containerStyle} className="gameBoard">
        <div className="status" style={instructionsStyle}>
          Current player: {this.state.clickCount % 2 === 0 ? 'X' : 'O'}
        </div>
        <div className="winner" style={instructionsStyle}>
          {gameRestarted ? 'Previous ' : ''}
          Winner: {this.state.winner}
        </div>
        <button style={buttonStyle} onClick={this.reset}>{gameOver ? 'Play again?' : 'Reset'}</button>
        <div style={boardStyle}>
          <div className="board-row" style={rowStyle}>
            <Square addClick={this.addClick} value={this.state.zero} index={'zero'} />
            <Square addClick={this.addClick} value={this.state.one} index={'one'} />
            <Square addClick={this.addClick} value={this.state.two} index={'two'} />
          </div>
          <div className="board-row" style={rowStyle}>
            <Square addClick={this.addClick} value={this.state.three} index={'three'} />
            <Square addClick={this.addClick} value={this.state.four} index={'four'} />
            <Square addClick={this.addClick} value={this.state.five} index={'five'} />
          </div>
          <div className="board-row" style={rowStyle}>
            <Square addClick={this.addClick} value={this.state.six} index={'six'} />
            <Square addClick={this.addClick} value={this.state.seven} index={'seven'} />
            <Square addClick={this.addClick} value={this.state.eight} index={'eight'} />
          </div>
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
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);