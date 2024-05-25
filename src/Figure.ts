import {Move} from "./Move";
import {Board} from "./board/Board";
import {Dir} from "./Dir";
import {Piece} from "./Piece";

export class Figure {
  path: string;
  price: number;
  dirs: Array<Dir>;
  special: (board: Board, piece: Piece) => void;

  constructor(path: string, price: number, dirs: Array<Dir> = [], special: (board: Board, piece: Piece) => void = piece => {}) {
    this.path = path;
    this.price = price;
    this.dirs = dirs;
    this.special = special;
  }

  getPossibleMoveVariants(board: Board, i: number, j: number, color: string): Move[] {
    this.special(board, board.getPiece(i, j));
    let direction = color == 'white' ? -1 : 1;
    let moves: Array<Move> = new Array<Move>();
    for (let dir of this.dirs) {
      for (let move of dir.move) {
        if(move.i*direction + i >= board.size ||
          move.j*direction + j >= board.size ||
          move.j*direction + j < 0 ||
          move.i*direction + i < 0) {
          break;
        }

        if(move.eat == 1){
          if(board.isEnemyPiece(move.i*direction + i, move.j*direction + j, color)){
            moves.push({i: move.i*direction + i, j: move.j*direction + j, eat: move.eat});
            break;
          }
        }else if(move.eat == 0){
          if(!board.isPiece(move.i*direction + i, move.j*direction + j)) {
            moves.push({i: move.i * direction + i, j: move.j * direction + j, eat: move.eat});
          } else {
            break;
          }
        } else {
          if(!board.isPiece(move.i*direction + i, move.j*direction + j)) {
            moves.push({i: move.i * direction + i, j: move.j * direction + j, eat: move.eat});
          } else if(board.isEnemyPiece(move.i*direction + i, move.j*direction + j, color)){
            moves.push({i: move.i*direction + i, j: move.j*direction + j, eat: move.eat});
            break;
          } else {
            break;
          }
        }
      }
    }
    return moves;
  }
}
