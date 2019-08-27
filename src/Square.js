import React from 'react'

function Square(props) {
  if (props.winnerList && props.winnerList.indexOf(props.nowIndex) > -1) {
    return (
      <button
        className="square"
        style={{ color: 'green' }}
        onClick={props.onClick}
      >
        {props.value}
      </button>
    )
  } else {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    )
  }
}
export default Square
