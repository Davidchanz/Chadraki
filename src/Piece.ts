import {Figure} from "./Figure";
import {Move} from "./Move";
import {Board} from "./board/Board";
import {Dot} from "./Dot";

export class Piece {
  path: string;
  figure: Figure;
  alive: boolean;
  check: boolean;
  color: string;
  firstMove: boolean;
  i: number = 0;
  j: number = 0;

  constructor(color: string, figure: Figure) {
    this.check = false;
    this.color = color;
    this.alive = true;
    this.path = '../assets/' + color + '-' + figure.path;
    this.figure = figure;
    this.firstMove = true;
  }

  setPos(i: number, j: number) {
    this.i = i;
    this.j = j;
  }

  getPossibleMoveVariants(board: Board, i: number, j: number): Dot[]{
    return this.figure.getPossibleMoveVariants(board, i, j, this.color);
  }

  setFigure(figure: Figure): void {
    this.path = '../assets/' + this.color + '-' + figure.path;
    this.figure = figure;
  }

  isNextMoveCheck(board: Board, dot: Dot) {
    this.figure.isNextMoveCheck(board, dot);
  }
}
