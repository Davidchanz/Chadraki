import {Component} from '@angular/core';
import {Cell} from "../Cell";
import {Piece} from "../Piece";
import {Figures} from "../Figures";
import {Board} from "../board/Board";
import {Constants} from "../Constants";
import {Dot} from "../Dot";
import {Multiplayer} from "../Multiplayer";

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
  dots: (Dot | null)[];
  activePiece!: Piece;
  dotShowHide: string = 'block';
  isTurn: boolean = false;
  color!: string;

  constructor(private board: Board, private multiplayer: Multiplayer) {
    this.cellSize = Constants.cellSize;
    this.size = Constants.size;
    this.gameBoard = board.gameBoard;
    this.line = new Array<number>(this.size);
    this.pieces = this.board.pieces;
    this.dots = new Array<Dot>(this.size*this.size);
    this.clearDots();

    this.multiplayer.getState().subscribe(value => {
      this.isTurn = value.turn;
      this.color = value.color;
    })
  }

  getCell(i: number, j: number): Cell {
    return this.gameBoard[i + (j * (this.size))];
  }

  isPiece(i: number | undefined, j: number | undefined): boolean{
    if(i == undefined || j == undefined)
      return false;
    return this.board.isPiece(i, j);
  }

  onPieceClick(i: number, j: number){
    this.dotShowHide = 'block';
    this.activePiece = this.getPiece(i, j);
    this.clearDots();

    if(this.activePiece.color == this.color) {
      let possibleMoves = this.board.onPieceClick(i, j);
      possibleMoves.forEach(value => this.setDot(value))
    }
  }

  isDot(i: number | undefined, j: number | undefined): boolean {
    if(i == undefined || j == undefined)
      return false
    return this.dots[i + (j * (this.size))] != null;
  }

  getDot(i: number, j: number): Dot {
    return this.dots[i + (j * (this.size))]!;
  }

  setDot(dot: Dot){
    this.dots[dot.i + (dot.j * (this.size))] = dot;
  }

  onCellClick() {
    this.clearDots();
  }

  clearDots() {
    for (let i = 0; i < this.dots.length; i++) {
      this.dots[i] = null;
    }
  }

  getPiece(i: number, j: number): Piece{
    return this.board.getPiece(i, j)!;
  }

  onDotClick(i: number, j: number, target: EventTarget | null) {
    if(!this.isTurn){
      this.clearDots();
      return;
    }

    this.hideDots();
    let dot = this.getDot(i, j);
    if(dot.special == null)
      this.board.movePiece(this.activePiece, i, j);
    else
      dot.special();
    let interval = setInterval(()=>{
      this.multiplayer.sendTurn(this.board)
      this.multiplayer.getState().subscribe(value => {
        this.isTurn = true;
        this.color = value.color;
      })
      this.clearDots();
      clearInterval(interval)
    }, 300);
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

  private hideDots() {
    this.dotShowHide = 'none';
  }
}
