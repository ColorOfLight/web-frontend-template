import { useState } from "react";

import { Board, Player } from "./type";

export const useTicTacToe = () => {
  const [board, setBoard] = useState<Board>([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("O");
  const [winner, setWinner] = useState<Player | undefined>(undefined);

  return {
    board,
    currentPlayer,
    winner,
  };
};
