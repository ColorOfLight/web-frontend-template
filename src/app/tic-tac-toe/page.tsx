"use client";

import { useTicTacToe } from "./hook";

export default function TicTaeToePage() {
  const { currentPlayer, board, result, getHandleBoardItemClick } =
    useTicTacToe();

  const message = (() => {
    if (result !== undefined) {
      if (result === "win-O") return "Winner: O";
      if (result === "win-X") return "Winner: X";
      if (result === "draw") return "Draw";
      throw new Error("Result should be win-${Player}, draw or undefined");
    }
    return `Current Player: ${currentPlayer}`;
  })();

  return (
    <main>
      <div className="flex p-12 gap-8">
        <div>
          <p className="mb-4">{message}</p>
          <div>
            {board.map((row, rowNum) => (
              <div className="flex" key={`${rowNum}`}>
                {row.map((value, colNum) => (
                  <div
                    className="w-20 h-20 border"
                    key={`${rowNum},${colNum}`}
                    onClick={getHandleBoardItemClick(rowNum, colNum)}
                  >
                    {value}
                  </div>
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
