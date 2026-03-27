import { useState } from "react";

/**
 * 计算赢家
 * @param {string[]} squares 方块的值
 * @returns {string|null} 赢家或null
 */
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null
}
/**
 * 方块组件
 * @param {Object} props 
 * @param {string} props.value 方块的值
 * @param {Function} props.onSquareClick 方块的点击事件
 * @returns {JSX.Element} 方块组件
 */
function Square({ value, onSquareClick }) {
    return <button className="square" onClick={onSquareClick}>{value}</button>;
}
/**
 * 棋盘组件
 * @returns {JSX.Element} 棋盘组件
 */
function Board({ xIsNext, squares, onPlay,winner }) {
    // const [squares, setSquares] = useState(Array(9).fill(null))
    // const [xIsNext, setXIsNext] = useState(true)
    
    let status
    if (winner) {
        status = 'Winner: ' + winner
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O')
    }
    function handleClick(i) {
        if (winner || squares[i]) {
            return
        }
        const nextSquares = squares.slice()
        if (xIsNext) {
            nextSquares[i] = 'X'
        } else {
            nextSquares[i] = 'O'
        }
        // setSquares(nextSquares)
        // setXIsNext(!xIsNext)
        onPlay(nextSquares)
    }
    return (
        <>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
            <div className="status">{status}</div>
        </>
    )
}
/**
 * 游戏全局组件
 */
function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove,setCurrentMove] = useState(0)
    const currentSquares = history[currentMove];
    const xIsNext = currentMove % 2 === 0
    const winner = calculateWinner(currentSquares)

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0,currentMove+1),nextSquares]
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length - 1);
      }

      function jumpTo(nextMove) {
        setCurrentMove(nextMove)
        // setHistory(history.slice(0,nextMove))
      }
      const moves = history.map((square,move)=>{
        return (
            <li key={move}>
            <button onClick={()=>jumpTo(move)} >Go to move {move}</button>
            </li>
        )
      })
    return (
        <div className="game">
            <div className="game-board">
                <Board winner={winner} xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div>{currentMove}</div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    )
}
export default Game