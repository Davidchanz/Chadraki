import {Injectable} from "@angular/core";
import {Cell} from "../Cell";
import {Piece} from "../Piece";
import {Figures} from "../Figures";
import {Constants} from "../Constants";
import {literal} from "@angular/compiler";
import {Dot} from "../Dot";

@Injectable({
  providedIn: 'root'
})
export class Board {
  gameBoard: Cell[];
  pieces: (Piece | null)[];
  kings: Piece[];

  constructor() {
    this.gameBoard = new Array<Cell>(Constants.size*Constants.size);
    this.fillBoard()
    this.pieces = new Array<Piece | null>(Constants.size*Constants.size);
    this.fillPieces();
    this.kings = new Array<Piece>()
    for (let piece of this.pieces) {
      if(piece != null && piece.figure == Figures.king){
        this.kings.push(piece);
      }
    }
  }

  fillBoard(){
    let color: boolean = true;
    for (let i = 0; i < this.gameBoard.length; i++) {
      if(i % Constants.size != 0)
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
    for (let k = 0; k < Constants.size; k++) {
      for (let l = 0; l < Constants.size; l++) {
        let pi = this.getPiece(k, l);
        if(pi != null)
          pi.setPos(k, l);
      }
    }
  }

  fillBlack() {
    for (let i = 0; i < Constants.size; i++) {
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
    for (let i = 0; i < Constants.size; i++) {
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
    return this.pieces[i + (j * (Constants.size))] != null;
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

  getPiece(i: number, j: number): Piece | null {
    return this.pieces[i + (j * (Constants.size))];
  }

  setPiece(piece: Piece | null, i: number, j: number) {
    this.pieces[i + (j * (Constants.size))] = piece;
  }

  getPieceIndex(i: number, j: number): number{
    return i + (j * (Constants.size));
  }

  movePiece(piece: Piece, i: number, j: number) {
    let id: string = piece.j+'_'+piece.i;
    let previousElementSibling = window.document.getElementById(id);
    previousElementSibling!.style.zIndex = '20';
    previousElementSibling!.style.transform = 'translate('+i*Constants.cellSize+'px, '+j*Constants.cellSize+'px)';

    let interval = setInterval(()=>{
      previousElementSibling!.style.zIndex = '10';

      this.setPiece(null, piece.i, piece.j)
      piece.firstMove = false;
      piece.setPos(i, j);
      this.setPiece(piece, i, j);

      for (let king of this.kings) {
        king.check = false;
      }
      for (let pi of this.pieces) {
        if(pi != null){
          this.onPieceClick(pi.i, pi.j);
        }
      }

      this.checkWin();

      clearInterval(interval)
    }, 300);
  }

  getKing(color: string): Piece | null{
    for (let king of this.kings) {
      if(king.color == color)
        return king;
    }
    return null;
  }

  onPieceClick(i: number, j: number):Dot[]{
    let piece = this.getPiece(i, j);
    let possibleMoveVariants:Dot[] = piece!.getPossibleMoveVariants(this, i, j);
    let possibleMoves: Dot[] = new Array<Dot>();
    for (let possibleMoveVariant of possibleMoveVariants) {
      if(this.moveIsPossible(possibleMoveVariant, piece!))
        possibleMoves.push(possibleMoveVariant)
    }
    return possibleMoves;
  }

  private moveIsPossible(dot: Dot, piece: Piece): boolean {

    let otherKing = this.getKing(piece.color == 'white'? 'black' : 'white')!
    let otherKingCheck = otherKing.check;
    let king = this.getKing(piece.color);
    if(king == null)
      throw new Error("There is no king on the board!");
    if(king.check){

      let orig_i = piece.i;
      let orig_j = piece.j;
      let tmpPiece = this.getPiece(dot.i, dot.j);
      piece.i = dot.i;
      piece.j = dot.j;
      this.setPiece(piece, dot.i, dot.j)
      this.setPiece(null, orig_i, orig_j);

      king.check = false;
      for (let pi of this.pieces) {
        if(pi != null){
          pi.getPossibleMoveVariants(this, pi.i, pi.j);
        }
      }

      this.setPiece(tmpPiece, dot.i, dot.j)
      piece.i = orig_i;
      piece.j = orig_j;
      this.setPiece(piece, orig_i, orig_j)

      otherKing.check = otherKingCheck;

      if(king.check){
        return false;
      }else{
        king.check = true
        return true;
      }

    }else {

      let orig_i = piece.i;
      let orig_j = piece.j;
      let tmpPiece = this.getPiece(dot.i, dot.j);
      piece.i = dot.i;
      piece.j = dot.j;
      this.setPiece(piece, dot.i, dot.j)
      this.setPiece(null, orig_i, orig_j)

      //king.check = false;
      for (let pi of this.pieces) {
        if(pi != null){
          pi.getPossibleMoveVariants(this, pi.i, pi.j);
        }
      }

      this.setPiece(tmpPiece, dot.i, dot.j)
      piece.i = orig_i;
      piece.j = orig_j;
      this.setPiece(piece, orig_i, orig_j)

      otherKing.check = otherKingCheck;

      if(king.check){
        king.check = false;
        return false;
      }else{
        return true;
      }

    }
  }

  private checkWin() {
    for (let king of this.kings) {
      let possibleMoves = this.onPieceClick(king.i, king.j);
      if(possibleMoves.length == 0 && king.check){
        for (let piece of this.pieces) {
          if(piece != null && piece.color == king.color){
            let dots = this.onPieceClick(piece.i, piece.j);
            dots.forEach(value => possibleMoves.push(value))
          }
        }
        if(possibleMoves.length == 0 && king.check){
          alert("Mat")
        }
      } else {
        if(possibleMoves.length > 0)
          continue;
        for (let piece of this.pieces) {
          if(piece != null && piece.color == king.color){
            let dots = this.onPieceClick(piece.i, piece.j);
            dots.forEach(value => possibleMoves.push(value))
          }
        }
        if (possibleMoves.length == 0 && !king.check){
           alert("Pat")
        }
      }
    }
  }

  isCastlePossible(king: Piece, rock: Piece) {
    if(king.check)
      return true
    else {
      //console.log('rock')
      //console.log(rock)
      //console.log('king')
      //console.log(king)
      return true;
    }
  }
}
