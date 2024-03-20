import { useState, useCallback } from "react";

import { Board, Player, Result, History } from "./type";
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
  const [result, setResult] = useState<Result>(undefined);
  const [histories, setHistories] = useState<History[]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState<number>();

  const toggleCurrentPlayer = useCallback(() => {
    if (currentPlayer === "O") setCurrentPlayer("X");
    else if (currentPlayer === "X") setCurrentPlayer("O");
    else {
      throw new Error("TypeError: Player cannot be set except O or X!");
    }
  }, [currentPlayer]);

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
      let newResult: Result = result;

      setBoard(newBoard);

      toggleCurrentPlayer();

      const winner = getBoardWinner(newBoard);
      if (winner != null) {
        newResult = `win-${winner}`;
      }
      if (checkBoardFull(newBoard)) {
        newResult = "draw";
      }

      setResult(newResult);

      setHistories([
        ...(currentHistoryIndex != null
          ? histories.slice(0, currentHistoryIndex + 1)
          : []),
        {
          player: currentPlayer,
          playedRowNum: rowNum,
          playedColNum: colNum,
          board: newBoard,
          result: newResult,
        },
      ]);
      setCurrentHistoryIndex(
        currentHistoryIndex != null ? currentHistoryIndex + 1 : 0
      );
    },
    [
      board,
      currentPlayer,
      result,
      histories,
      currentHistoryIndex,
      toggleCurrentPlayer,
    ]
  );

  const getHandleHistoryClick = useCallback(
    (index: number) => () => {
      // TODO: add user feedback
      if (index === currentHistoryIndex) return;

      if (index >= histories.length)
        throw new Error("RangeError: index cannot exceed histories length!");

      const {
        board: historyBoard,
        player: historyPlayer,
        result: historyResult,
      } = histories[index];

      setBoard(historyBoard);
      setResult(historyResult);
      setCurrentPlayer(historyPlayer === "X" ? "O" : "X");
      setCurrentHistoryIndex(index);
    },
    [currentHistoryIndex, histories]
  );

  return {
    board,
    currentPlayer,
    result,
    histories,
    currentHistoryIndex,
    getHandleBoardItemClick,
    getHandleHistoryClick,
  };
};
