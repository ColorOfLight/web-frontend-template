import { useState, useCallback } from "react";

import { Board, Player, Result } from "./type";
import {
  deepCopy2DArrayWithChange,
  getBoardWinner,
  checkBoardFull,
} from "./util";

export const useTicTacToe = () => {
  const [board, setBoard] = useState<Board>([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("O");
  const [result, setResult] = useState<Result | undefined>(undefined);

  const toggleCurrentPlayer = useCallback(() => {
    if (currentPlayer === "O") setCurrentPlayer("X");
    else if (currentPlayer === "X") setCurrentPlayer("O");
    else {
      throw new Error("TypeError: Player cannot be set except O or X!");
    }
  }, [currentPlayer]);

  const updateBoardStatus = useCallback(
    (newBoard: Board) => {
      toggleCurrentPlayer();

      const winner = getBoardWinner(newBoard);
      if (winner != null) setResult(`win-${winner}`);
      if (checkBoardFull(newBoard)) setResult("draw");
    },
    [toggleCurrentPlayer]
  );

  const getHandleBoardItemClick = useCallback(
    (rowNum: number, colNum: number) => () => {
      if (board.length <= rowNum) {
        throw new Error(
          "RangeOutError: Input rowNum exceeds the size of board rows!"
        );
      }

      if (board[rowNum].length <= colNum) {
        throw new Error(
          "RangeOutError: Input colNum exceeds the size of board columns!"
        );
      }

      // TODO: add user feedback
      if (result !== undefined) return;
      if (board[rowNum][colNum] !== undefined) return;

      const newBoard = deepCopy2DArrayWithChange(
        board,
        rowNum,
        colNum,
        currentPlayer
      );
      setBoard(newBoard);
      updateBoardStatus(newBoard);
    },
    [board, currentPlayer, updateBoardStatus, result]
  );

  return {
    board,
    currentPlayer,
    result,
    getHandleBoardItemClick,
  };
};
