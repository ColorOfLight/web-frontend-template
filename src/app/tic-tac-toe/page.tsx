"use client";

import { useTicTacToe } from "./hook";

export default function TicTaeToePage() {
  const { currentPlayer, board, winner } = useTicTacToe();

  const message = winner
    ? `Winner: ${winner}`
    : `Current Player: ${currentPlayer}`;

  return (
    <main>
      <div className="flex p-12 gap-8">
        <div>
          <p className="mb-4">{message}</p>
          <div>
            {board.map((row, y) => (
              <div className="flex" key={`${y}`}>
                {row.map((value, x) => (
                  <div className="w-20 h-20 border" key={`${x},${y}`}></div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div>
          <ol>
            <li>
              <button>1. Player: X, Position: (1, 1)</button>
            </li>
            <li>
              <button className="font-bold">
                2. Player: Y, Position: (2, 1)
              </button>
            </li>
          </ol>
        </div>
      </div>
    </main>
  );
}
