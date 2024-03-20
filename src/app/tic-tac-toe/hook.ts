import { useState } from "react";

import { Board, Player, Result } from "./type";

export const useTicTacToe = () => {
  const [board, setBoard] = useState<Board>([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("O");
  const [result, setResult] = useState<Result | undefined>(undefined);

  return {
    board,
    currentPlayer,
    result,
  };
};
