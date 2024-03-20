export type Player = "O" | "X";

export type Board = (Player | undefined)[][];

export type Result = `win-${Player}` | "draw" | "undefined";
