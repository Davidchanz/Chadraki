import { Component } from '@angular/core';
import {Cell} from "../Cell";
import {Piece} from "../Piece";
import {Figures} from "../Figures";
import {Move} from "../Move";
import {Board} from "../board/Board";
import {state, style, trigger} from "@angular/animations";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent {
  cellSize: number
  size: number;
  gameBoard: Cell[];
  line: number[];
  pieces: (Piece| null)[];
  dots: string[];
  activePiece!: Piece;
  check: string;

  constructor(private board: Board) {
    this.cellSize = 58;
    this.size = board.size;
    this.gameBoard = board.gameBoard;
    this.line = new Array<number>(this.size);
    this.pieces = this.board.pieces;
    this.dots = new Array<string>(this.size*this.size);
    this.clearDots();
    this.check = 'true';
  }

  getCell(i: number, j: number): Cell {
    return this.gameBoard[i + (j * (this.size))];
  }

  isPiece(i: number, j: number): boolean{
    return this.board.isPiece(i, j);
  }

  onPieceMove(i: number, j: number){
    for (let piece1 of this.pieces) {
      if (piece1 != null)
        piece1.check = false;
    }
    for (let k = 0; k < this.size; k++) {
      for (let l = 0; l < this.size; l++) {
        let pi = this.getPiece(k, l);
        if(pi != null){
          if(pi.figure != Figures.king) {
            pi.getPossibleMoveVariants(this.board, k, l);
          }
        }
      }
    }

    let piece = this.getPiece(i, j);
    this.activePiece = piece;
    let possibleMoveVariants:Move[] = piece.getPossibleMoveVariants(this.board, i, j);
    this.clearDots();
    for (let possibleMoveVariant of possibleMoveVariants) {
      this.setDot(possibleMoveVariant.i, possibleMoveVariant.j);
    }
  }

  isDot(i: number, j: number): boolean {
    return this.dots[i + (j * (this.size))] != '';
  }

  getDot(i: number, j: number): string {
    return this.dots[i + (j * (this.size))];
  }

  setDot(i: number, j: number){
    this.dots[i + (j * (this.size))] = '../assets/dot.png'
  }

  onCellClick() {
    this.clearDots();
  }

  clearDots() {
    for (let i = 0; i < this.dots.length; i++) {
      this.dots[i] = '';
    }
  }

  getPiece(i: number, j: number): Piece {
    return this.board.getPiece(i, j);
  }

  onDotClick(i: number, j: number) {
    this.clearDots();
    this.board.movePiece(this.activePiece, i, j);
    this.onPieceMove(i, j);
    this.clearDots();
  }

  isKing(i: number, j: number): boolean {
    let piece = this.getPiece(i, j);
    return piece.figure == Figures.king
  }

  isCheck(i: number, j: number): string {
    if(this.getPiece(i, j).check)
      return 'block'
    else
      return 'none'
  }
}
