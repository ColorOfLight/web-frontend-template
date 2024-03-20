export type Player = "O" | "X";

export type Board = (Player | undefined)[][];

export type Result = `win-${Player}` | "draw" | undefined;

export type History = {
  player: Player;
  playedRowNum: number;
  playedColNum: number;
  board: Board;
  result: Result;
};
