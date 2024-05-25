import {Figure} from "./Figure";
import {Move} from "./Move";
import {Board} from "./board/Board";

export class Piece {
  path: string;
  figure: Figure;
  alive: boolean;
  check: boolean;
  color: string;
  firstMove: boolean;

  constructor(color: string, figure: Figure) {
    this.check = false;
    this.color = color;
    this.alive = true;
    this.path = '../assets/' + color + '-' + figure.path;
    this.figure = figure;
    this.firstMove = true;
  }

  getPossibleMoveVariants(board: Board, i: number, j: number): Move[]{
    return this.figure.getPossibleMoveVariants(board, i, j, this.color);
  }

  setFigure(figure: Figure): void {
    this.path = '../assets/' + this.color + '-' + figure.path;
    this.figure = figure;
  }
}
