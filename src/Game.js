import React, {Component} from 'react'

function Board(props) {
    const squares = props.squares
    const onSquareClick = props.onSquareClick
    const win = props.win
    const boardWidth = Math.sqrt(squares.length) * 50
    const styles = { width: boardWidth + 'px' }
    return <div className="board" style={ styles }>{ 
        squares.map((value, index) => {
          const highlight = win && win.includes(index)
          return <Square 
            onClick={ () => onSquareClick(index) } 
            value={ value }
            highlight={ highlight }/>
        })
    }</div>
  }
  
  function Square(props) {
    const styles = { 
      backgroundColor: props.highlight ? 'yellow' : 'transparent' 
    }
    return <div className="square" style={ styles } 
             onClick={ props.onClick }>{ props.value }</div>
  }
  
  function Info(props) {
    const onHistoryClick = props.onHistoryClick
    const step = props.step
    return <div className="info">
      <Status message={ props.status }/>
      <History history={ props.history } onHistoryClick={ onHistoryClick } step={ step }/>
     </div>
  }
  
  function Status(props) {
    return <p className="status">{ props.message }</p>
  }
  
  function History(props) {
    const onHistoryClick = props.onHistoryClick
    const step = props.step
    const history = props.history
    return <ul className="history">{ 
        history.map((item, index) => {
          const value = !index ? 'Game start' : GetMoveInfo(index, history)
          const highlight = step === index
          return <HistoryItem highlight={ highlight } onClick={ () => onHistoryClick(index) } value={ value }/>
        })
     }</ul>
  }
  
  function HistoryItem(props) {
    const styles = { backgroundColor: props.highlight ? 'yellow' : 'transparent' }
    return <li className="history__item" style={ styles } onClick={ props.onClick }>{ props.value }</li>
  }
  
  function GetMoveInfo(index, history) {
    const boardSize = Math.sqrt(history[0].squares.length)
    const squares = history[ index ].squares
    const priorSquares = history[ index - 1 ].squares
    const move = squares.reduce((acc, val, ndx) => {
      return squares[ndx] !== priorSquares[ndx] ? ndx : acc
    }, null)
    const position = GetMovePosition(move, boardSize)
    return squares[move] + ' on ' + position.join(':')
  }
  
  function GetMovePosition(move, boardSize) {
    return [ (move % boardSize) + 1, Math.ceil((move + 1) / boardSize) ]
  }
  
  export default class Game extends Component {
    constructor(props) {
      super(props)
      // console.log(props.boardSize)
      this.state = {
        history: [
          { squares: Array(props.boardSize * props.boardSize).fill(null) }
        ],
        xNext: true,
        step: 0
      }
      this.handleSquareClick = this.handleSquareClick.bind(this)
      this.handleHistoryClick = this.handleHistoryClick.bind(this)
    }
    render() {
      const step = this.state.step
      const history = this.state.history.slice(0)
      const squares = history[ step ].squares
      const handleSquareClick = this.handleSquareClick
      const handleHistoryClick = this.handleHistoryClick
      const win = this.getWin(squares)
      const nextMove = this.state.xNext ? 'X' : 'O'
      const status = win ? squares[win[0]] + ' wins!' : nextMove + ' is next'
      return <div className="game">
        <Board squares={ squares } onSquareClick={ handleSquareClick } win={ win }/>
        <Info status={ status } history={ history } onHistoryClick={ handleHistoryClick } step={ step }/>
      </div>
    }
    handleHistoryClick(index) {
      this.setState({
        step: index,
        xNext: index % 2 == 0
      })
    }
    handleSquareClick(index) {
      const step = this.state.step
      const history = this.state.history.slice(0, step + 1)
      const squares = history[ history.length - 1 ].squares.slice(0)
      const xNext = this.state.xNext
      if (squares[index] || this.getWin(squares)) {
        return;
      }
      squares[index] = xNext ? 'X' : 'O'
      this.setState({
        history: history.concat({ squares: squares }),
        xNext: !xNext,
        step: step + 1
      })
    }
    getWins(boardSize) {
      const moves = Array(boardSize + boardSize + 2).fill(null)
      return moves.slice(0).map((value, index) => {
        if (index < boardSize) {
          // [index, index + 1, index + 2, index + 3]
          return Array(boardSize).fill(null).map((val, ndx) => (index * boardSize) + ndx) 
        }
        else if (index < (boardSize * 2)) {
          // [index  - boardSize, index, index + boardSize * 1, index + boardSize * 2]
          // index = 2 5 9 13
          return Array(boardSize).fill(null).map((val, ndx) => Math.max(index - boardSize, (index - boardSize) + (boardSize * ndx))) 
        }
        else {
          // Diagnal top-right to bottom-left
          // top-left to bottom-right
          if (index % 2 === 0) {
            // [(boardSize + 1) * 0, (boardSize + 1) * 1, (boardSize + 1) * 2, (boardSize + 1) * 3]
            return Array(boardSize).fill(null).map((val, ndx) => (boardSize + 1) * ndx ) 
          } else {
            // [(boardSize - 1) * 1, (boardSize - 1) * 2, (boardSize - 1) * 3, (boardSize - 1) * 4]
            return Array(boardSize).fill(null).map((val, ndx) => (boardSize - 1) * (ndx + 1)) 
          }
        }
      })
    }
    getWin(squares) {
      const boardSize = this.props.boardSize
      const wins = this.getWins(boardSize)
      const win = this.calculateWin(squares, wins)
      return win.length ? win[0] : null
    }
    calculateWin(items, sequences) {
      return sequences.filter((sequence) => {
        return sequence.reduce((acc, val) => {
          return items[val] === acc ? acc : null
        }, items[sequence[0]]) ? true : false
      })
    }
  }
  
