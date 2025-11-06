//  Game -> Bord -> Square -> Hostory
import { useState } from "react";
function Square({ value, onSquareClick }) {
  return (
    <button
      className="bg-white  border-gray-400 h-20 w-20 m-3 leading-10 text-lg"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, square, onPlay }) {
  const winner = calculateWinner(square);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = "Next player " + (xIsNext ? "X" : "O");
  }

  function handleclick(i) {
    const nextSquares = square.slice();

    if (square[i] || calculateWinner(square)) {
      return;
    }

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  return (
    <>
      <div>{status}</div>
      <div className="flex">
        <Square value={square[0]} onSquareClick={() => handleclick(0)} />
        <Square value={square[1]} onSquareClick={() => handleclick(1)} />
        <Square value={square[2]} onSquareClick={() => handleclick(2)} />
      </div>
      <div className="flex">
        <Square value={square[3]} onSquareClick={() => handleclick(3)} />
        <Square value={square[4]} onSquareClick={() => handleclick(4)} />
        <Square value={square[5]} onSquareClick={() => handleclick(5)} />
      </div>

      <div className="flex">
        <Square value={square[6]} onSquareClick={() => handleclick(6)} />
        <Square value={square[7]} onSquareClick={() => handleclick(7)} />
        <Square value={square[8]} onSquareClick={() => handleclick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    setXIsNext(!xIsNext);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  function jumpTo(move) {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0);
  }

  const moves = history.map((square, move) => {
    let description;
    if (move > 0) {
      description = `Go to the move # ${move}`;
    } else {
      description = `Go to start the game`;
    }
    return (
      <li key={move} className="bg-gray-700 text-white mb-1 p-1 rounded-sm">
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center p-4 bg-gray-100 min-h-screen">
        <div className="mr-0 md:mr-16">
          <Board
            xIsNext={xIsNext}
            square={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <div className="mt-4 md:mt-0 max-h-64 overflow-y-auto">
          <ul className=" border-gray-400 p-2 rounded-lg bg-white shadow-md">
            {moves}
          </ul>
        </div>
      </div>
    </>
  );
}

function calculateWinner(square) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (square[a] && square[a] === square[b] && square[a] === square[c]) {
      return square[a];
    }
  }
  return null;
}
