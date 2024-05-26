import {Board} from "./board/Board";
import {Piece} from "./Piece";

export class Dot {
  path: string = '../assets/dot.png';
  i: number;
  j: number;
  special: (() => void) | null;

  constructor(i: number, j: number, special: (() => void) | null = null) {
    this.i = i;
    this.j = j;
    this.special = special;
  }
}
