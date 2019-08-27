import React from 'react'
import Square from './Square'

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
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
        {/* <div className="board-row">
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
        </div> */}
      </div>
    )
  }
}

export default Board
