import { Board, Player } from "./type";

export function deepCopy2DArrayWithChange<T>(
  originalArray: T[][],
  rowNum: number,
  colNum: number,
  newValue: T
) {
  const newArray = originalArray.map((row) => [...row]);

  newArray[rowNum][colNum] = newValue;

  return newArray;
}

export function getBoardWinner(board: Board) {
  const winnerCheckIndexes = getWinnerCheckIndexes();
  const baseCheckItems: (Player | undefined)[][] = Array(
    winnerCheckIndexes.length
  ).fill([]);
  const flattenBoard = board.flat();

  const checkItems = flattenBoard.reduce(
    (prevCheckItems, boardItem, boardItemIndex) => {
      return prevCheckItems.map((checkItem, checkItemIndex) => {
        if (winnerCheckIndexes[checkItemIndex].includes(boardItemIndex)) {
          return [...checkItem, boardItem];
        }
        return checkItem;
      });
    },
    baseCheckItems
  );

  const winners = checkItems.map(getRowWinner);

  return getSingleWinner(winners);
}

export function getRowWinner(row: Board[number]) {
  if (row.length === 0) return null;

  let tempWinner = null;
  for (let i = 0; i < row.length; i++) {
    if (row[i] === undefined) return null;
    else if (tempWinner === null) tempWinner = row[i];
    else if (row[i] !== tempWinner) return null;
  }

  return tempWinner;
}

export function getSingleWinner(winners: (Player | null | undefined)[]) {
  if (winners.length === 0) return null;

  let tempWinner = null;
  for (let i = 0; i < winners.length; i++) {
    if (winners[i] != null) {
      if (tempWinner === null) tempWinner = winners[i];
      if (tempWinner !== winners[i])
        throw new Error("Error: Winner cannot be two players!");
    }
  }

  return tempWinner;
}

export function getWinnerCheckIndexes() {
  return [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
}

export function checkBoardFull(board: Board) {
  const flattenBoard = board.flat();

  return Boolean(flattenBoard.every((item) => item != null));
}
