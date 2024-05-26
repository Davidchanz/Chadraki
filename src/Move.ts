import {Board} from "./board/Board";
import {Piece} from "./Piece";

export type Move = {
  i: number;
  j: number;
  eat: number;
  special: () => void
}
