import React from 'react'
import './App.scss'
import Board from './Board'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          nowCoor: null
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      orderDesc: true // true:升序，false：降序
    }
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat([
        {
          squares: squares,
          nowCoor: [parseInt(i / 3) + 1, (i % 3) + 1]
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    })
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    })
  }
  handleOrder() {
    this.setState({
      orderDesc: !this.state.orderDesc
    })
  }
  render() {
    const orderDesc = this.state.orderDesc ? '升序' : '降序'
    let history = this.state.history.slice()
    const current = history[this.state.stepNumber]
    const winner =
      calculateWinner(current.squares) &&
      calculateWinner(current.squares).winner
    const winnerList =
      calculateWinner(current.squares) &&
      calculateWinner(current.squares).winnerList
    const newList = []

    if (this.state.orderDesc) {
      history.map((step, move) => {
        newList.push({ step, move })
        return step
      })
    } else {
      history.map((step, move) => {
        newList.unshift({ step, move })
        return step
      })
    }
    const moves = newList.map((item, index) => {
      const desc = item.move
        ? 'Go to move #' +
          item.move +
          '   当前坐标为：(' +
          item.step.nowCoor +
          ')'
        : 'Go to game start'

      if (item.move === this.state.stepNumber) {
        return (
          <li key={item.move}>
            <button
              style={{ color: 'red' }}
              onClick={() => this.jumpTo(item.move)}
            >
              {desc}
            </button>
          </li>
        )
      } else {
        return (
          <li key={item.move}>
            <button onClick={() => this.jumpTo(item.move)}>{desc}</button>
          </li>
        )
      }
    })
    let status
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status =
        current.squares.indexOf(null) > -1
          ? 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
          : '当前平局哟'
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winnerList={winnerList}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <button onClick={() => this.handleOrder()}>{orderDesc}</button>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}

function App() {
  return <Game />
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        winnerList: [a, b, c]
      }
    }
  }
  return null
}

export default App
