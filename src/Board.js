import React from 'react'
import Square from './Square'

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        nowIndex={i}
        winnerList={this.props.winnerList}
        onClick={() => this.props.onClick(i)}
        key={i}
      />
    )
  }
  render() {
    let arr = [0, 1, 2]
    return (
      <div>
        {arr.map((val, index) => {
          return (
            <div className="board-row" key={index}>
              {arr.map((v, i) => {
                return this.renderSquare(i + 3 * index)
              })}
            </div>
          )
        })}
      </div>
    )
  }
}

export default Board
