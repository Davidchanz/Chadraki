import {Move} from "./Move";
import {Board} from "./board/Board";
import {Dir} from "./Dir";
import {Piece} from "./Piece";
import {Constants} from "./Constants";
import {Dot} from "./Dot";

export class Figure {
  path: string;
  price: number;
  dirs: Array<Dir>;
  special: (board: Board, piece: Piece | null) => Dir[] | null;

  constructor(path: string, price: number, dirs: Array<Dir> = [], special: (board: Board, piece: Piece | null) => Dir[] | null = piece => {return null}) {
    this.path = path;
    this.price = price;
    this.dirs = dirs;
    this.special = special;
  }

  getPossibleMoveVariants(board: Board, i: number, j: number, color: string): Dot[] {
    let specialMove = this.special(board, board.getPiece(i, j));
    let availableDirs = Array.from(this.dirs);
    if(specialMove != null)
      specialMove.forEach(value => availableDirs.push(value))
    let direction = color == 'white' ? -1 : 1;
    let dots: Dot[] = new Array<Dot>();

    function push(move: Move) {
      if(move.special != null) {
        dots.push(new Dot(move.i * -1 + i, move.j * direction + j, move.special));
      }else
        dots.push(new Dot(move.i * direction + i, move.j * direction + j));
    }

    for (let dir of availableDirs) {
      for (let move of dir.move) {
        if(move.i*direction + i >= Constants.size ||
          move.j*direction + j >= Constants.size ||
          move.j*direction + j < 0 ||
          move.i*direction + i < 0) {
          break;
        }

        if(move.eat == 1){
          if(board.isEnemyPiece(move.i*direction + i, move.j*direction + j, color)){
            push(move);
            break;
          }
        }else if(move.eat == 0){
          if(!board.isPiece(move.i*-1 + i, move.j*direction + j)) {
            push(move);
          } else {
            break;
          }
        } else {
          if(!board.isPiece(move.i*direction + i, move.j*direction + j)) {
            push(move);
          } else if(board.isEnemyPiece(move.i*direction + i, move.j*direction + j, color)){
            push(move);
            break;
          } else {
            break;
          }
        }
      }
    }
    return dots;
  }

  isNextMoveCheck(board: Board, dot: Dot) {
  }
}
