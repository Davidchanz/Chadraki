import {Injectable} from "@angular/core";
import {Cell} from "../Cell";
import {Piece} from "../Piece";
import {Figures} from "../Figures";

@Injectable({
  providedIn: 'root'
})
export class Board {
  size: number;
  gameBoard: Cell[];
  pieces: (Piece | null)[];

  constructor() {
    this.size = 8;
    this.gameBoard = new Array<Cell>(this.size*this.size);
    this.fillBoard()
    this.pieces = new Array<Piece | null>(this.size*this.size);
    this.fillPieces();
  }

  fillBoard(){
    let color: boolean = true;
    for (let i = 0; i < this.gameBoard.length; i++) {
      if(i % this.size != 0)
        color = !color;
      if(color)
        this.gameBoard[i] = new Cell('../assets/white.png');
      else
        this.gameBoard[i] = new Cell('../assets/black.png');
    }
  }

  private fillPieces() {
    this.fillBlack()
    this.fillWhite()
  }

  fillBlack() {
    for (let i = 0; i < this.size; i++) {
      this.pieces[this.getPieceIndex(i, 1)] = new Piece('black', Figures.pawn);
    }
    this.pieces[this.getPieceIndex(0, 0)] = new Piece('black', Figures.rock);
    this.pieces[this.getPieceIndex(1, 0)] = new Piece('black', Figures.knight);
    this.pieces[this.getPieceIndex(2, 0)] = new Piece('black', Figures.bishop);
    this.pieces[this.getPieceIndex(3, 0)] = new Piece('black', Figures.quine);
    this.pieces[this.getPieceIndex(4, 0)] = new Piece('black', Figures.king);
    this.pieces[this.getPieceIndex(6, 0)] = new Piece('black', Figures.knight);
    this.pieces[this.getPieceIndex(5, 0)] = new Piece('black', Figures.bishop);
    this.pieces[this.getPieceIndex(7, 0)] = new Piece('black', Figures.rock);
  }

  fillWhite() {
    for (let i = 0; i < this.size; i++) {
      this.pieces[this.getPieceIndex(i, 6)] = new Piece('white', Figures.pawn);
    }
    this.pieces[this.getPieceIndex(0, 7)] = new Piece('white', Figures.rock);
    this.pieces[this.getPieceIndex(1, 7)] = new Piece('white', Figures.knight);
    this.pieces[this.getPieceIndex(2, 7)] = new Piece('white', Figures.bishop);
    this.pieces[this.getPieceIndex(3, 7)] = new Piece('white', Figures.quine);
    this.pieces[this.getPieceIndex(4, 7)] = new Piece('white', Figures.king);
    this.pieces[this.getPieceIndex(6, 7)] = new Piece('white', Figures.knight);
    this.pieces[this.getPieceIndex(5, 7)] = new Piece('white', Figures.bishop);
    this.pieces[this.getPieceIndex(7, 7)] = new Piece('white', Figures.rock);
  }

  isPiece(i: number, j: number): boolean{
    return this.pieces[i + (j * (this.size))] != null;
  }

  isEnemyPiece(i: number, j: number, color: string): boolean{
    let piece = this.getPiece(i, j);
    if(piece == null)
      return false;
    else if (piece.figure == Figures.king && piece.color != color){
      piece.check = true;
      return false;
    } else
      return piece.color != color;
  }

  getPiece(i: number, j: number): Piece {
    return this.pieces[i + (j * (this.size))]!;
  }

  setPiece(piece: Piece, i: number, j: number) {
    this.pieces[i + (j * (this.size))] = piece;
  }

  getPieceIndex(i: number, j: number): number{
    return i + (j * (this.size));
  }

  movePiece(piece: Piece, i: number, j: number) {
    for (let k = 0; k < this.pieces.length; k++) {
      if(this.pieces[k] == piece) {
        this.pieces[k] = null;
      }
    }
    piece.firstMove = false;
    this.setPiece(piece, i, j);
  }

}
